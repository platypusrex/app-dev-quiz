import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ViewController, NavParams, Content } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import io from 'socket.io-client';
import { IGameCategory } from '../../shared/models/game-categories.model';
import { Subscription } from 'rxjs/Subscription';
import { IUser } from '../../shared/models/user.model';

@Component({
  selector: 'chat-room-cmp',
  templateUrl: 'chat-room.component.html'
})
export class ChatRoomComponent implements OnDestroy {
  @ViewChild(Content) content: Content;
  user$: Subscription;
  user: IUser;
  socket: any;
  category: IGameCategory;
  message: string = '';
  messages: {message: string; user: IUser, date: Date}[] = [];
  typing: {userName: string, isTyping: boolean} | null = null;
  typingTimeout: any;

  constructor(
    private store: Store<AppState>,
    private viewCtrl: ViewController,
    private navParams: NavParams
  ){
    this.user$ = this.store.select(state => state.auth.user).subscribe(user => {
      this.user = user;
    });

    if(navParams.get('category')) {
      this.category = navParams.get('category');
      this.connectToRoom(this.category);
    }
  }

  scrollToBottom() {
      this.content.scrollToBottom(0);
  }

  ngOnDestroy() {
    this.socket.emit('disconnect', this.user.userName);
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
      user: this.user,
      date: new Date()
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
}
