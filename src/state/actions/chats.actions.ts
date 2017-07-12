import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { IChat } from '../../shared/models/chats.model';

@Injectable()
export class ChatsActions {
  static GET_CHAT_MESSAGES = 'GET_CHAT_MESSAGES';
  getChatMessages(roomName: string): Action {
    return {
      type: ChatsActions.GET_CHAT_MESSAGES,
      payload: roomName
    };
  }

  static GET_CHAT_MESSAGES_SUCCESS = 'GET_CHAT_MESSAGES_SUCCESS';
  getChatMessagesSuccess(chatMessages: IChat[]): Action {
    return {
      type: ChatsActions.GET_CHAT_MESSAGES_SUCCESS,
      payload: chatMessages
    }
  }

  static GET_CHAT_MESSAGES_FAILURE = 'GET_CHAT_MESSAGES_FAILURE';
  getChatMessagesFailer(err) {
    return {
      type: ChatsActions.GET_CHAT_MESSAGES_FAILURE,
      payload: err
    }
  }

  static REMOVE_CHAT_MESSAGES = 'REMOVE_CHAT_MESSAGES';
  removeChatMessages() {
    return {
      type: ChatsActions.REMOVE_CHAT_MESSAGES
    }
  }
}