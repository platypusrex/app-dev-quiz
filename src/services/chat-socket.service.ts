import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { ChatsActions } from '../state/actions/chats.actions';
import * as io from 'socket.io-client';
import { Subscription } from 'rxjs/Subscription';
import { chatEvents } from '../shared/constants/socket.constants';
import { IChat, IUserTyping } from '../shared/models/chats.model';
import { IGameCategory } from '../shared/models/game-categories.model';

@Injectable()
export class ChatSocketService {
  private socket: SocketIOClient.Socket;
  private url: string = 'http://localhost:8000/';
  private typing: IUserTyping;
  private typing$: Subscription;
  private typingTimeout;

  constructor(
    private store: Store<AppState>,
    private chatsActions: ChatsActions
  ) {
    this.typing$ = this.store.select(state => state.chats.typing).subscribe(typing => {
      this.typing = typing;
    });
  }

  joinChatRoom(category: IGameCategory) {
    this.socket = io(`${this.url}${category.type}`);

    this.socket.emit(chatEvents.joinRoom, category.displayName);

    this.socket.on(chatEvents.message, (msgData) => {
      this.store.dispatch(this.chatsActions.addChatMessage(msgData))
    });

    this.socket.on(chatEvents.userTyping, (typingData: IUserTyping) => {
      this.store.dispatch(this.chatsActions.userIsTyping(typingData));
    });

    this.socket.on(chatEvents.userStopTyping, () => {
      this.store.dispatch(this.chatsActions.userStoppedTyping());
    });
  }

  handleSendMessage(msgData: IChat) {
    this.socket.emit(chatEvents.newMessage, msgData);
  }

  handleTypingTimeout() {
    this.socket.emit(chatEvents.stopTyping);
  }

  handleUserTyping(userName: string, e) {
    if (!this.typing) {
      this.socket.emit(chatEvents.typing, userName);
    } else {
      clearTimeout(this.typingTimeout);
      this.typingTimeout = setTimeout(this.handleTypingTimeout.bind(this), 1500);
    }
  }

  disconnectFromChatRoom(userName: string) {
    this.socket.emit(chatEvents.disconnect, userName);
    this.store.dispatch(this.chatsActions.removeChatMessages());
  }
}