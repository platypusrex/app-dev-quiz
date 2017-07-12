import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ViewController, NavParams, Content } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { ChatsActions } from '../../state/actions/chats.actions';
import { IGameCategory } from '../../shared/models/game-categories.model';
import { IUser } from '../../shared/models/user.model';
import { IChat } from '../../shared/models/chats.model';
import { Subscription } from 'rxjs/Subscription';
import io from 'socket.io-client';

@Component({
  selector: 'chat-room-cmp',
  templateUrl: 'chat-room.component.html'
})
export class ChatRoomComponent implements OnDestroy {
  @ViewChild(Content) content: Content;
  user$: Subscription;
  user: IUser;
  messages$: Subscription;
  messages: IChat[] = [];
  socket: any;
  category: IGameCategory;
  message: string = '';
  typing: {userName: string, isTyping: boolean} | null = null;
  typingTimeout: any;

  constructor(
    private store: Store<AppState>,
    private chatsActions: ChatsActions,
    private viewCtrl: ViewController,
    private navParams: NavParams
  ){
    this.user$ = this.store.select(state => state.auth.user).subscribe(user => {
      this.user = user;
    });

    this.messages$ =  this.store.select(state => state.chats.chats).subscribe(chats => {
      chats.forEach(chat => {
        this.messages.push(chat);
      })
    });

    if(navParams.get('category')) {
      this.category = navParams.get('category');
      this.connectToRoom(this.category);
    }
  }
  ionViewDidEnter() {
    this.store.dispatch(this.chatsActions.getChatMessages(this.category.type));
  }

  ngOnDestroy() {
    this.socket.emit('disconnect', this.user.userName);
    this.store.dispatch(this.chatsActions.removeChatMessages());
    this.user$.unsubscribe();
    this.messages$.unsubscribe();
  }

  connectToRoom (category: IGameCategory) {
    this.socket = io(`http://localhost:8000/${category.type}`);
    this.socket.emit('joinRoom', category.displayName);

    this.socket.on('message', function(msgData) {
      this.messages.push(msgData);
    }.bind(this));

    this.socket.on('userTyping', function(typingData) {
      if(!this.typing) this.typing = typingData;
    }.bind(this));

    this.socket.on('userStopTyping', function(typingData) {
      if(this.typing && Object.keys(this.typing).length) this.typing = typingData;
    }.bind(this));
  }

  sendMessage(e) {
    const msgData = {
      message: this.message,
      userName: this.user.userName,
      roomName: this.category.type,
      createdOn: new Date()
    };
    this.socket.emit('newMessage', msgData);
    this.message = '';
  }

  handleKeyDown() {
    this.socket.emit('typing', this.user.userName);
    this.typingTimeout = setTimeout(() => {
      clearTimeout(this.typingTimeout);
      this.socket.emit('stopTyping')
    }, 2000);
  }

  closeModal() {
    this.socket.emit('leaveRoom', this.user.userName);
    this.socket.emit('disconnect');
    setTimeout(() => {
      this.viewCtrl.dismiss();
    }, 250);
  }

  scrollToBottom() {
    this.content.scrollToBottom(0);
  }
}
