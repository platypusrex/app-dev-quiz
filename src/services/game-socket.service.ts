import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { LoadingActions } from '../state/actions/loading.actions';
import { GamesActions } from '../state/actions/game.actions';
import { TriviaQuestionActions } from '../state/actions/trivia-question.actions';
import { gameEvents } from '../shared/constants/socket.constants';
import { IGameCategory } from '../shared/models/game-categories.model';
import { ICreateGame, IGame } from '../shared/models/game.model';
import { IChat } from '../shared/models/chats.model';
import { IGetTriviaQuestion, ITriviaQuestion } from '../shared/models/trivia-question.model';
import { apiBasePath } from './api.service';

@Injectable()
export class GameSocketService {
  private socket: SocketIOClient.Socket;
  private game: IGame;

  constructor(
    private store: Store<AppState>,
    private loadingActions: LoadingActions,
    private gamesActions: GamesActions,
    private triviaQuestionActions: TriviaQuestionActions
  ) {
    this.store.select(state => state.games.game).subscribe(game => {
      this.game = game;
    });
  }

  joinGameRoom(category: IGameCategory) {
    this.socket = io(`${apiBasePath}${category.type}-games`);
    this.socket.emit(gameEvents.joinRoom, category.displayName);

    this.socket.on(gameEvents.message, (msgData) => {
      this.store.dispatch(this.gamesActions.updateGameMessages(msgData));
    });

    this.getOnePlayerGameEventListeners();
    this.getTwoPlayerGameEventListeners();
    this.getGameEventListeners();
  }

  handleCreateOnePlayerGame(createGameData: ICreateGame) {
    this.socket.emit(gameEvents.createOnePlayerGame, createGameData);
  }

  handleCreateTwoPlayerGame(createGameData: ICreateGame) {
    this.socket.emit(gameEvents.createTwoPlayerGame, createGameData);
  }

  handleCheckForBothPlayersJoined (userName: string) {
    if (this.game) {
      const playersJoined = this.game.players.filter(player => player.status === 'joined');
      if (playersJoined.length !== 2) {
        this.handleLeaveTwoPlayerGame(userName, 'timedOut');
        this.store.dispatch(this.loadingActions.loadingFinish());
        return true;
      }
      return false;
    }
  }

  handleLeaveOnePlayerGame(userName: string) {
    if (this.game) {
      this.socket.emit(gameEvents.cancelOnePlayerGame, {
        room: this.game.room,
        id: this.game._id,
        status: 'cancelled',
        userName: userName
      });
    }
    this.socket.emit(gameEvents.leaveRoom);
    this.store.dispatch(this.gamesActions.clearGameData());
    this.store.dispatch(this.triviaQuestionActions.clearTriviaQuestion());
  }

  handleLeaveTwoPlayerGame(userName?: string, gameStatus?: string) {
    if (userName && this.game) {
      this.socket.emit(gameEvents.cancelTwoPlayerGame, {
        room: this.game.room,
        id: this.game._id,
        status: gameStatus || 'cancelled',
        userName: userName
      });
    }

    if (!userName) {
      this.socket.emit(gameEvents.leaveRoom);
    }

    this.store.dispatch(this.gamesActions.clearGameData());
    this.store.dispatch(this.triviaQuestionActions.clearTriviaQuestion());
  }

  handleGetTriviaQuestionCollection(getQuestionData: IGetTriviaQuestion) {
    if (this.game) {
      getQuestionData.room = this.game.room;
      this.socket.emit(gameEvents.getQuestions, getQuestionData);
    }
  }

  getGameEventListeners() {
    this.socket.on(gameEvents.getQuestionsSuccess, (questionData: ITriviaQuestion[]) => {
      this.store.dispatch(this.triviaQuestionActions.getTriviaQuestionCollection(questionData));
    });
  }

  getOnePlayerGameEventListeners() {
    this.socket.on(gameEvents.onePlayerGameCreated, (gameData: IGame) => {
      this.store.dispatch(this.gamesActions.updateGameData(gameData));
      this.socket.emit(gameEvents.onePlayerGameCreatedSuccess, this.game);
    });

    this.socket.on(gameEvents.onePlayerGameCanceled, (msgData: IChat) => {
      if (this.game) {
        this.store.dispatch(this.gamesActions.updateGameMessages(msgData));
      }
    });
  }

  getTwoPlayerGameEventListeners() {
    this.socket.on(gameEvents.twoPlayerGameCreated, (gameData: IGame) => {
      this.store.dispatch(this.gamesActions.updateGameData(gameData));
      this.store.dispatch(this.loadingActions.loadingStart());
      this.socket.emit(gameEvents.twoPlayerGameCreatedSuccess, this.game);
    });

    this.socket.on(gameEvents.twoPlayerGameStarted, (gameData: IGame) => {
      this.store.dispatch(this.gamesActions.updateGameData(gameData));
      this.store.dispatch(this.loadingActions.loadingFinish());
      this.socket.emit(gameEvents.twoPlayerGameStartedSuccess, this.game);
    });

    this.socket.on(gameEvents.twoPlayerGameCanceled, (msgData: IChat) => {
      if (this.game) {
        this.store.dispatch(this.gamesActions.updateGameMessages(msgData));
      }
    });
  }
}