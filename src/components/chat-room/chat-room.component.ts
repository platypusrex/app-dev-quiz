import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ViewController, NavParams, Content } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { ChatsActions } from '../../state/actions/chats.actions';
import { ChatSocketService } from '../../services/chat-socket.service';
import { IGameCategory } from '../../shared/models/game-categories.model';
import { IUser } from '../../shared/models/user.model';
import { IChat, IUserTyping } from '../../shared/models/chats.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'chat-room-cmp',
  templateUrl: 'chat-room.component.html'
})
export class ChatRoomComponent implements OnDestroy {
  @ViewChild(Content) content: Content;
  messages$: Observable<Array<IChat>>;
  typing$: Observable<IUserTyping>;
  user$: Subscription;
  user: IUser;
  category: IGameCategory;
  message: string = '';

  constructor(
    private store: Store<AppState>,
    private chatsActions: ChatsActions,
    private chatSocketService: ChatSocketService,
    private viewCtrl: ViewController,
    private navParams: NavParams
  ){
    this.user$ = this.store.select(state => state.auth.user).subscribe(user => {
      this.user = user;
    });

    this.messages$ = this.store.select(state => state.chats.chats);
    this.typing$ = this.store.select(state => state.chats.typing);

    if(navParams.get('category')) {
      this.category = navParams.get('category');
      this.chatSocketService.joinChatRoom(this.category);
    }
  }

  ionViewDidEnter() {
    this.store.dispatch(this.chatsActions.getChatMessages(this.category.type));
  }

  ngOnDestroy() {
    this.chatSocketService.disconnectFromRoom(this.user.userName);
    this.user$.unsubscribe();
  }

  sendMessage() {
    const msgData:IChat = {
      message: this.message,
      userName: this.user.userName,
      roomName: this.category.type,
      createdOn: new Date()
    };
    this.chatSocketService.sendMessage(msgData);
    this.message = '';
  }

  handleKeyDown(e) {
    this.chatSocketService.handleUserTyping(this.user.userName, e);
  }

  closeModal() {
    setTimeout(() => {
      this.viewCtrl.dismiss();
    }, 200);
  }

  scrollToBottom() {
    this.content.scrollToBottom(0);
  }
}
