import { ActionReducer, Action } from '@ngrx/store';
import { ChatsActions } from '../actions/chats.actions';
import { IChat } from '../../shared/models/chats.model';

export interface IChatsState {
  chats: IChat[];
  error?: any
}

const initialState: IChatsState = {
  chats: [],
};

export const ChatsReducer: ActionReducer<any> = (state: IChatsState = initialState, action: Action) => {
  switch(action.type) {
    case ChatsActions.GET_CHAT_MESSAGES_SUCCESS:
      return Object.assign({}, state, { chats: action.payload});

    case ChatsActions.GET_CHAT_MESSAGES_FAILURE:
      return Object.assign({}, state, { error: action.payload });

    case ChatsActions.REMOVE_CHAT_MESSAGES:
      return Object.assign({}, state, { chats: []});

    default:
      return state;
  }
};