import { ActionReducer, Action } from '@ngrx/store';
import { UserSearchActions } from '../actions/user-search.actions';
import { IUserSearch } from '../../shared/models/user-search.model';

const initialState: IUserSearch = {
  query: '',
  isSearching: false,
  result: []
};

export const UserSearchReducer: ActionReducer<any> = (state: IUserSearch = initialState, action: Action) => {
  switch(action.type) {
    case UserSearchActions.SEARCH_USERS:
      return Object.assign({}, state, { query: action.payload, isSearching: true, result: [] });

    case UserSearchActions.SEARCH_USERS_SUCCESS:
      return Object.assign({}, state, { isSearching: false, result: action.payload });

    case UserSearchActions.SEARCH_USERS_CANCEL:
      return Object.assign({}, state, { query: '', isSearching: false, result: [] });

    default:
      return state;
  }
};