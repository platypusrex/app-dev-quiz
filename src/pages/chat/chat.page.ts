import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import io from 'socket.io-client';
import { ChatRoomComponent } from '../../components/chat-room/chat-room.component';
import { IGameCategory } from '../../shared/models/game-categories.model';

@Component({
  selector: 'chat-page',
  templateUrl: 'chat.page.html'
})
export class ChatPage {
  socket: any;

  constructor(private modalCtrl: ModalController) {}

  onCategoryClick(category: IGameCategory) {
    // this.socket = io(`http://localhost:8000/${category.type}`);
    // this.socket.emit('connect', function(){
    //   console.log('fuck it');
    // });
    //
    // this.socket.on( 'message', function( event ) {
    //   console.log( 'chat message:', event )
    // });
    let modal = this.modalCtrl.create(ChatRoomComponent, {category});
    modal.present();
  }
}