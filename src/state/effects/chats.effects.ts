import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { ChatsService } from '../../services/chats.service';
import { ChatsActions } from '../actions/chats.actions';
import 'rxjs/add/operator/mergeMap';
import { Observable } from "rxjs";

@Injectable()
export class ChatsEffects {
  constructor(
    private actions$: Actions,
    private chatsService: ChatsService,
    private chatsActions: ChatsActions,
  ){}

  @Effect() getChatMessages$: Observable<Action> = this.actions$
    .ofType(ChatsActions.GET_CHAT_MESSAGES)
    .mergeMap(action => this.chatsService.getChatMessages(action.payload)
      .map(chats => this.chatsActions.getChatMessagesSuccess(chats))
      .catch(err => Observable.of(this.chatsActions.getChatMessagesFailer(err)))
    );
}
