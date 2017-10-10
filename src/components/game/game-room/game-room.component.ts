import { Component, OnDestroy } from '@angular/core';
import { NavParams, ViewController, AlertController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { LoadingService } from '../../../services/loading.service';
import { GameSocketService } from '../../../services/game-socket.service';
import { TimerService } from '../../../services/timer.service';
import { IGameCategory } from '../../../shared/models/game-categories.model';
import { IUser } from '../../../shared/models/user.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { animations } from '../../../shared/animations';
import { twoPlayerGameEvents } from '../../../shared/constants/socket.constants';
import { IChat } from '../../../shared/models/chats.model';
import { ICreateGame, IGame, IGameType } from '../../../shared/models/game.model';
import uuid from 'uuid/v4';
import { ITriviaQuestion } from '../../../shared/models/trivia-question.model';

@Component({
  selector: 'game-room-cmp',
  templateUrl: 'game-room.component.html',
  animations: [
    animations(650, 100, 'ease-in-out')
  ]
})
export class GameRoomComponent implements OnDestroy {
  game$: Observable<IGame>;
  triviaQuestion$: Observable<ITriviaQuestion>;
  messages$: Subscription;
  user$: Subscription;
  loading$: Subscription;
  questionTimer$: Subscription;
  messages: IChat[];
  category: IGameCategory;
  user: IUser;
  gameType: IGameCategory | null;
  gameTimeout: number;
  questionTimer: number;

  constructor(
    private store: Store<AppState>,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private loadingService: LoadingService,
    private gameSocketService: GameSocketService,
    private timerService: TimerService
  ) {
    this.user$ = this.store.select(state => state.auth.user).subscribe(user => this.user = user);
    this.loading$ = this.loadingService.loadingCmp$.subscribe(loadingCmp => loadingCmp.dismiss());
    this.game$ = this.store.select(state => state.games.game);
    this.triviaQuestion$ = this.store.select(state => state.triviaQuestion.triviaQuestion);

    this.questionTimer$ = this.timerService.getTimer().subscribe(timer => {
      // console.log(timer);
      if (timer === 0) {
        setTimeout(() => {
          this.getTriviaQuestion();
        }, 1000);
      }
      this.questionTimer = timer
    });

    this.messages$ = this.store.select(state => state.games.messages).subscribe(messages => {
      this.messages = messages;
      const cancelRoomData = this.messages.find(message => message.message === twoPlayerGameEvents.twoPlayerGameCanceled);
      if(this.viewCtrl.pageRef() && cancelRoomData) {
        this.presentGameCancelledAlert(cancelRoomData.userName);
        this.viewCtrl.dismiss();
      }
    });

    if(navParams.get('category')) {
      this.category = navParams.get('category');
      this.gameSocketService.joinGameRoom(this.category);
    }
  }

  ngOnDestroy() {
    this.user$.unsubscribe();
    this.messages$.unsubscribe();
    this.loading$.unsubscribe();
    this.questionTimer$.unsubscribe();
    clearTimeout(this.gameTimeout);
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
    this.timerService.startTimer(6);
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

  getTriviaQuestion(id?: string) {
    this.gameSocketService.handleGetNewQuestion({
      category: this.category.type,
      id
    })
  }

  handlePlayerAnswerSelection(userAnswer: {choice: string; triviaQuestion: ITriviaQuestion}) {
    console.log('answer check', userAnswer.choice === userAnswer.triviaQuestion.answer);
    this.getTriviaQuestion(userAnswer.triviaQuestion._id || undefined);
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