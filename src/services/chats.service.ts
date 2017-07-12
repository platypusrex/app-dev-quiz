import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class ChatsService {
  chatsPath = 'chat_rooms/';

  constructor(private api: ApiService){}

  getChatMessages(roomName: string): Observable<any> {
    return this.api.get(`${this.chatsPath}?roomName=${roomName}`, true)
      .map(result => result)
  }
}