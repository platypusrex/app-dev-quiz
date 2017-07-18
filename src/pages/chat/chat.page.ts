import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { ChatRoomComponent } from '../../components/chat-room/chat-room.component';
import { IGameCategory } from '../../shared/models/game-categories.model';

@Component({
  selector: 'chat-page',
  templateUrl: 'chat.page.html'
})
export class ChatPage {
  constructor(private modalCtrl: ModalController) {}

  onCategoryClick(category: IGameCategory) {
    let modal = this.modalCtrl.create(ChatRoomComponent, {category});
    modal.present();
  }
}