import { Component } from '@angular/core';
import io from 'socket.io-client';
import { IGameCategory } from '../../shared/models/game-categories.model';

@Component({
  selector: 'chat-page',
  templateUrl: 'chat.page.html'
})
export class ChatPage {
  socket: any;

  constructor() {
    this.socket = io('http://localhost:8000/');
    this.socket.on('connect', function(){
      console.log('fuck it');
    });
    this.socket.emit('message', {message: 'fuck you bitch', userName: 'p_rex'})
  }

  onCategoryClick(category: IGameCategory) {
    console.log(category);
  }
}