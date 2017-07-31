import { Component, OnDestroy } from '@angular/core';
import { NavParams, ViewController, AlertController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { GamesActions } from '../../state/actions/game.actions';
import { LoadingService } from '../../services/loading.service';
import { GameSocketService } from '../../services/game-socket.service';
import { IGameCategory } from '../../shared/models/game-categories.model';
import { IUser } from '../../shared/models/user.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { animations } from '../../shared/animations';
import { gameEvents } from '../../shared/constants/socket.constants';
import { IChat } from '../../shared/models/chats.model';
import { ICreateGame, IGame } from '../../shared/models/game.model';

@Component({
  selector: 'game-select-cmp',
  templateUrl: 'game-select.component.html',
  animations: [
    animations(650, 100, 'ease-in-out')
  ]
})
export class GameSelectComponent implements OnDestroy {
  game$: Observable<IGame>;
  messages$: Subscription;
  user$: Subscription;
  loading$: Subscription;
  messages: IChat[];
  category: IGameCategory;
  user: IUser;

  constructor(
    private store: Store<AppState>,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private loadingService: LoadingService,
    private gamesActions: GamesActions,
    private gameSocketService: GameSocketService
  ) {
    this.user$ = this.store.select(state => state.auth.user).subscribe(user => {
      this.user = user;
    });

    this.messages$ = this.store.select(state => state.games.messages).subscribe(messages => {
      this.messages = messages;
      const cancelRoomData = this.messages.find(message => message.message === gameEvents.gameCanceled);
      if(this.viewCtrl.pageRef() && cancelRoomData) {
        this.presentAlert(cancelRoomData.userName);
        this.viewCtrl.dismiss();
      }
    });

    this.loading$ = this.loadingService.loadingCmp$.subscribe(loadingCmp => {
      loadingCmp.dismiss();
    });

    this.game$ = this.store.select(state => state.games.game);

    if(navParams.get('category')) {
      this.category = navParams.get('category');
      this.gameSocketService.joinGameRoom(this.category);
    }
  }

  ngOnDestroy() {
    this.user$.unsubscribe();
    this.messages$.unsubscribe();
    this.loading$.unsubscribe();
  }

  createTwoPlayerGame() {
    const gameData: ICreateGame = {
      room: `${this.category.type}${this.user._id}`,
      type: `${this.category.type}`,
      userName: this.user.userName
    };
    this.gameSocketService.handleCreateTwoPlayerGame(gameData);
  }

  presentAlert(userName) {
    let alert = this.alertCtrl.create({
      title: `The game was closed by ${userName}.`,
      subTitle: 'Choose a lobby and start a new game!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            this.store.dispatch(this.gamesActions.clearGameData());
          }
        }
      ]
    });
    alert.present();
  }

  closeModal() {
    this.gameSocketService.handleCancelGameInProgress(this.user.userName);
    this.viewCtrl.dismiss();
  }
}