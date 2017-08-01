import { ActionReducer, Action } from '@ngrx/store';
import { ChatsActions } from '../actions/chats.actions';
import { IChat, IUserTyping } from '../../shared/models/chats.model';

export interface IChatsState {
  chats: IChat[];
  typing: IUserTyping | null
  error?: any,
}

const initialState: IChatsState = {
  chats: [],
  typing: null
};

export const ChatsReducer: ActionReducer<any> = (state: IChatsState = initialState, action: Action) => {
  switch(action.type) {
    case ChatsActions.GET_CHAT_MESSAGES_SUCCESS:
      return {...state, chats: [...state.chats, ...action.payload]};

    case ChatsActions.GET_CHAT_MESSAGES_FAILURE:
      return {...state, error: action.payload};

    case ChatsActions.ADD_CHAT_MESSAGE:
      return {...state, chats: [...state.chats, action.payload]};

    case ChatsActions.REMOVE_CHAT_MESSAGES:
      return {...state, chats: [], typing: null};

    case ChatsActions.USER_IS_TYPING:
      return {...state, typing: action.payload};

    case ChatsActions.USER_STOPPED_TYPING:
      return {...state, typing: initialState.typing};

    default:
      return state;
  }
};