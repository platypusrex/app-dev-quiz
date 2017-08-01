import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { IChat, IUserTyping } from '../../shared/models/chats.model';

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

  static ADD_CHAT_MESSAGE = 'ADD_CHAT_MESSAGE';
  addChatMessage(chatMessage: IChat): Action {
    return {
      type: ChatsActions.ADD_CHAT_MESSAGE,
      payload: chatMessage
    }
  }

  static REMOVE_CHAT_MESSAGES = 'REMOVE_CHAT_MESSAGES';
  removeChatMessages(): Action {
    return {
      type: ChatsActions.REMOVE_CHAT_MESSAGES
    }
  }

  static USER_IS_TYPING = 'USER_IS_TYPING';
  userIsTyping(typingData: IUserTyping): Action {
    return {
      type: ChatsActions.USER_IS_TYPING,
      payload: typingData
    }
  }

  static USER_STOPPED_TYPING = 'USER_STOPPED_TYPING';
  userStoppedTyping(): Action {
    return {
      type: ChatsActions.USER_STOPPED_TYPING
    }
  }
}