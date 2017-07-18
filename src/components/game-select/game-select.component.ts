import { Component, OnDestroy } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { LoadingActions } from '../../state/actions/loading.actions';
import { LoadingService } from '../../services/loading.service';
import { IGameCategory } from '../../shared/models/game-categories.model';
import io from 'socket.io-client';
import { IUser } from '../../shared/models/user.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'game-select-cmp',
  templateUrl: 'game-select.component.html'
})
export class GameSelectComponent implements OnDestroy {
  socket: any;
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
    this.socket.emit('leaveRoom');
    this.socket.emit('disconnect', this.user.userName);
    this.user$.unsubscribe();
    this.loading$.unsubscribe();
  }

  connectToLobby(category: IGameCategory) {
    this.socket = io(`http://localhost:8000/${category.type}-games`);
    this.socket.emit('joinRoom', category.displayName);

    this.socket.on('message', function(msgData) {
      console.log(msgData);
      this.messages.push(msgData);
    }.bind(this));

    this.socket.on('gameCreated', function(msgData) {
      let self = this;
      this.game = msgData;
      console.log(this.game);
      self.store.dispatch(self.loadingActions.loadingStart());
      this.socket.emit('gameCreatedSuccess', this.game);
    }.bind(this));

    this.socket.on('gameStarted', function(msgData) {
      let self = this;
      this.game = msgData;
      console.log(this.game);
      self.store.dispatch(self.loadingActions.loadingFinish());
      this.socket.emit('gameStartedSuccess', this.game);
    }.bind(this));
  }

  createMultiPlayerGame() {
    this.socket.emit('createGameMulti', {
      room: `${this.category.type}${this.user._id}`,
      type: `${this.category.type}`,
      userName: this.user.userName
    });
  }

  closeModal() {
    console.log('modal closed');
    this.socket.emit('leaveRoom');
    this.socket.emit('disconnect', this.user.userName);
    this.viewCtrl.dismiss();
    this.user$.unsubscribe();
  }
}