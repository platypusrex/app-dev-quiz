import { Component, OnDestroy } from '@angular/core';
import { NavParams, ViewController, AlertController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { LoadingActions } from '../../state/actions/loading.actions';
import { LoadingService } from '../../services/loading.service';
import { IGameCategory } from '../../shared/models/game-categories.model';
import { IUser } from '../../shared/models/user.model';
import { Subscription } from 'rxjs/Subscription';
import { animations } from '../../shared/animations';
import { gameEvents } from '../../shared/constants/socket.constants';
import * as io from 'socket.io-client';

const apiUrl: string = 'http://localhost:8000/';

@Component({
  selector: 'game-select-cmp',
  templateUrl: 'game-select.component.html',
  animations: [
    animations(650, 100, 'ease-in-out')
  ]
})
export class GameSelectComponent implements OnDestroy {
  socket: SocketIOClient.Socket;
  category: IGameCategory;
  user: IUser;
  user$: Subscription;
  messages: {message: string; userName: string; createdOn: Date;}[] = [];
  game: any;
  loading$: Subscription;

  constructor(
    private store: Store<AppState>,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private loadingActions: LoadingActions,
    private loadingService: LoadingService
  ) {
    this.user$ = this.store.select(state => state.auth.user).subscribe(user => {
      this.user = user;
    });

    this.loading$ = this.loadingService.loadingCmp$.subscribe(loadingCmp => {
      loadingCmp.dismiss();
    });

    if(navParams.get('category')) {
      this.category = navParams.get('category');
      this.connectToLobby(this.category);
    }
  }

  ngOnDestroy() {
    if (this.game) {
      this.socket.emit(gameEvents.leaveRoom, {
        room: this.game.room,
        id: this.game._id,
        userName: this.game.players.find(player => player.userName === this.user.userName)
      });
    }
    this.socket.emit(gameEvents.disconnect, this.user.userName);
    this.user$.unsubscribe();
    this.loading$.unsubscribe();
  }

  connectToLobby(category: IGameCategory) {
    this.socket = io(`${apiUrl}${category.type}-games`);
    this.socket.emit(gameEvents.joinRoom, category.displayName);

    this.socket.on(gameEvents.message, function(msgData) {
      this.messages.push(msgData);
    }.bind(this));

    this.socket.on(gameEvents.gameCreated, function(msgData) {
      let self = this;
      this.game = msgData;
      self.store.dispatch(self.loadingActions.loadingStart());
      this.socket.emit(gameEvents.gameCreatedSuccess, this.game);
    }.bind(this));

    this.socket.on(gameEvents.gameStarted, function(msgData) {
      let self = this;
      this.game = msgData;
      self.store.dispatch(self.loadingActions.loadingFinish());
      this.socket.emit(gameEvents.gameStartedSuccess, this.game);
    }.bind(this));

    this.socket.on(gameEvents.gameEnded, function(msgData) {
      if(this.viewCtrl.pageRef()) {
        this.viewCtrl.dismiss();
        this.presentAlert(msgData.userName);
      }
    }.bind(this));
  }

  createTwoPlayerGame() {
    this.socket.emit(gameEvents.createTwoPlayerGame, {
      room: `${this.category.type}${this.user._id}`,
      type: `${this.category.type}`,
      userName: this.user.userName
    });
  }

  presentAlert(userName) {
    let alert = this.alertCtrl.create({
      title: `The game was closed by ${userName}.`,
      subTitle: 'Choose a lobby and start a new game!',
      enableBackdropDismiss: true
    });
    alert.present();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}