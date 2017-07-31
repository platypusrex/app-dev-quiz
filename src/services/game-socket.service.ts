import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { LoadingActions } from '../state/actions/loading.actions';
import { GamesActions } from '../state/actions/game.actions';
import { gameEvents } from '../shared/constants/socket.constants';
import { IGameCategory } from '../shared/models/game-categories.model';
import { ICreateGame, IGame } from '../shared/models/game.model';
import { IChat } from '../shared/models/chats.model';

@Injectable()
export class GameSocketService {
  private socket: SocketIOClient.Socket;
  private url: string = 'http://localhost:8000/';
  private game: IGame;

  constructor(
    private store: Store<AppState>,
    private loadingActions: LoadingActions,
    private gamesActions: GamesActions
  ) {
    this.store.select(state => state.games.game).subscribe(game => {
      this.game = game;
    })
  }

  joinGameRoom(category: IGameCategory) {
    this.socket = io(`${this.url}${category.type}-games`);
    this.socket.emit(gameEvents.joinRoom, category.displayName);

    this.socket.on(gameEvents.message, function(msgData) {
      let self = this;
      self.store.dispatch(self.gamesActions.updateGameMessages(msgData));
    }.bind(this));

    this.socket.on(gameEvents.gameCreated, function(gameData: IGame) {
      let self = this;
      self.store.dispatch(self.gamesActions.updateGameData(gameData));
      self.store.dispatch(self.loadingActions.loadingStart());
      this.socket.emit(gameEvents.gameCreatedSuccess, this.game);
    }.bind(this));

    this.socket.on(gameEvents.gameStarted, function(gameData: IGame) {
      let self = this;
      self.store.dispatch(self.gamesActions.updateGameData(gameData));
      self.store.dispatch(self.loadingActions.loadingFinish());
      this.socket.emit(gameEvents.gameStartedSuccess, this.game);
    }.bind(this));

    this.socket.on(gameEvents.gameCanceled, function(msgData: IChat) {
      let self = this;
      if (self.game) {
        self.store.dispatch(self.gamesActions.updateGameMessages(msgData));
      }
    }.bind(this));
  }

  handleCreateTwoPlayerGame(createGameData: ICreateGame) {
    this.socket.emit(gameEvents.createTwoPlayerGame, createGameData)
  }

  handleCancelGameInProgress(userName: string) {
    if (this.game) {
      this.socket.emit(gameEvents.cancelTwoPlayerGame, {
        room: this.game.room,
        id: this.game._id,
        userName: userName
      });
      this.socket.emit(gameEvents.disconnect);
    }
    this.store.dispatch(this.gamesActions.clearGameData());
  }
}