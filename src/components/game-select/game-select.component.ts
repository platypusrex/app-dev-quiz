import { Component, OnDestroy } from '@angular/core';
import { NavParams, ViewController, AlertController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
// import { GamesActions } from '../../state/actions/game.actions';
import { LoadingService } from '../../services/loading.service';
import { GameSocketService } from '../../services/game-socket.service';
import { IGameCategory } from '../../shared/models/game-categories.model';
import { IUser } from '../../shared/models/user.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { animations } from '../../shared/animations';
import { twoPlayerGameEvents } from '../../shared/constants/socket.constants';
import { IChat } from '../../shared/models/chats.model';
import { ICreateGame, IGame, IGameType } from '../../shared/models/game.model';
import uuid from 'uuid/v4';

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
  gameType: IGameCategory | null;
  gameTimeout: number;

  constructor(
    private store: Store<AppState>,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private loadingService: LoadingService,
    // private gamesActions: GamesActions,
    private gameSocketService: GameSocketService
  ) {
    this.user$ = this.store.select(state => state.auth.user).subscribe(user => {
      this.user = user;
    });

    this.messages$ = this.store.select(state => state.games.messages).subscribe(messages => {
      this.messages = messages;
      const cancelRoomData = this.messages.find(message => message.message === twoPlayerGameEvents.twoPlayerGameCanceled);
      if(this.viewCtrl.pageRef() && cancelRoomData) {
        this.presentGameCancelledAlert(cancelRoomData.userName);
        this.viewCtrl.dismiss();
      }
    });

    this.loading$ = this.loadingService.loadingCmp$.subscribe(loadingCmp => loadingCmp.dismiss());

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
    clearTimeout(this.gameTimeout);
  }

  createTwoPlayerGame() {
    this.gameType = 'twoPlayer';
    const gameData: ICreateGame = {
      room: `${this.category.type}${uuid()}`,
      type: `${this.category.type}` as IGameType,
      category: 'twoPlayer',
      userName: this.user.userName
    };
    this.gameSocketService.handleCreateTwoPlayerGame(gameData);
    this.checkForBothPlayersJoined();
  }

  checkForBothPlayersJoined() {
    this.gameTimeout = window.setTimeout(() => {
      if (this.gameSocketService.handleCheckForBothPlayersJoined(this.user.userName)) {
        this.presentGameTimedOutAlert();
        this.viewCtrl.dismiss();
      }
    }, 15000);
  }

  createOnePlayerGame() {
    this.gameType = 'onePlayer';
    const gameData: ICreateGame = {
      room: `${this.category.type}${uuid()}`,
      type: `${this.category.type}` as IGameType,
      category: 'onePlayer',
      userName: this.user.userName
    };
    this.gameSocketService.handleCreateOnePlayerGame(gameData);
  }

  presentGameTimedOutAlert() {
    let alert = this.alertCtrl.create({
      title: `Sorry dude.`,
      subTitle: 'Looks like nobody joined the game.',
    });
    alert.present();
  }

  presentGameCancelledAlert(userName) {
    let alert = this.alertCtrl.create({
      title: `The game was closed by ${userName}.`,
      subTitle: 'Choose a lobby and start a new game!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            this.gameSocketService.handleLeaveTwoPlayerGame();
          }
        }
      ]
    });
    alert.present();
  }

  closeModal() {
    switch (this.gameType) {
      case 'onePlayer':
        this.gameSocketService.handleLeaveOnePlayerGame(this.user.userName);
        break;
      case 'twoPlayer':
        this.gameSocketService.handleLeaveTwoPlayerGame(this.user.userName);
        break;
      default:
        this.gameSocketService.handleLeaveTwoPlayerGame();
        break;
    }

    this.viewCtrl.dismiss();
  }
}