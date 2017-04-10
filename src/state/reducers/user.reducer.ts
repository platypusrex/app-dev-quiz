import { ActionReducer, Action } from '@ngrx/store';
import { UserActions } from '../actions/user.actions';
import { IUser } from '../../shared/models/user.model';

export interface IAuthError {
  type?: string;
  message?: string;
}

export interface IUserState {
  user: IUser;
  authError: IAuthError
}

const initialState: IUserState = {
  user: {},
  authError: {}
};

export const UserReducer: ActionReducer<any> = (state: IUserState = initialState, action: Action) => {
  switch(action.type) {
    case UserActions.USER_SUCCESS:
      return Object.assign({}, state, { user: action.payload, authError: {} });

    case UserActions.USER_FAILURE:
      return Object.assign({}, state, { authError: action.payload });

    case UserActions.LOGOUT_USER:
      return Object.assign({}, state, { user: {}, authError: {} });

    default:
      return state;
  }
};