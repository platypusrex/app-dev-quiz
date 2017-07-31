import { ActionReducer, Action } from '@ngrx/store';
import { GamesActions } from '../actions/game.actions';
import { IGameCategories } from '../../shared/models/game-categories.model'
import { IChat } from '../../shared/models/chats.model';
import { IGame } from '../../shared/models/game.model';

export interface IGamesState {
  categories: IGameCategories
  messages: IChat[];
  game: IGame | null;
  isGameCanceled: boolean;
}

const initialState: IGamesState = {
  categories: {},
  messages: [],
  game: null,
  isGameCanceled: false
};

export const GamesReducer: ActionReducer<any> = (state: IGamesState = initialState, action: Action) => {
  switch(action.type) {
    case GamesActions.GET_CATEGORIES_SUCCESS:
      return {...state, categories: action.payload};

    case GamesActions.UPDATE_GAME_DATA:
      return {...state, game: {...state.game, ...action.payload}};

    case GamesActions.UPDATE_GAME_MESSAGES:
      return {...state, messages: [...state.messages, ...action.payload]};

    case GamesActions.CLEAR_GAME_DATA:
      return {...state, game: null, messages: []};

    default:
      return state;
  }
};