import { ActionReducer, Action } from '@ngrx/store';
import { GamesActions } from '../actions/game.actions';
import { IGameCategories } from '../../shared/models/game-categories.model'

export interface IGamesState {
  categories: IGameCategories
}

const initialState: IGamesState = {
  categories: {}
};

export const GamesReducer: ActionReducer<any> = (state: IGamesState = initialState, action: Action) => {
  switch(action.type) {
    case GamesActions.GET_CATEGORIES_SUCCESS:
      return Object.assign({}, state, { categories: action.payload });

    default:
      return state;
  }
};