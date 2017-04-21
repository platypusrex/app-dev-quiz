import { ActionReducer, Action } from '@ngrx/store';
import { UserActions } from '../actions/user.actions';
import { IUser } from '../../shared/models/user.model';
import { storageGet } from '../../shared/utils/storage.util';

export interface IAuthError {
  type?: string;
  message?: string;
}

export interface IAuthData {
  token?: string;
  userId?: string;
}

export interface IUserState {
  user: IUser;
  authError: IAuthError,
  authData: IAuthData
  profileUser: IUser
}

const initialState: IUserState = {
  user: {},
  authError: {},
  authData: {
    token: storageGet('token'),
    userId: storageGet('userId')
  },
  profileUser: {}
};

export const UserReducer: ActionReducer<any> = (state: IUserState = initialState, action: Action) => {
  switch(action.type) {
    case UserActions.USER_SUCCESS:
      return Object.assign({}, state, { user: action.payload, authError: {}, profileUser: action.payload });

    case UserActions.USER_FAILURE:
      return Object.assign({}, state, { authError: action.payload });

    case UserActions.AUTH_SUCCESS:
      return Object.assign({}, state, {
        authError: {},
        user: action.payload.user,
        authData: {
          token: action.payload.token,
          userId: action.payload.user._id
        },
        profileUser: action.payload.user
      });

    case UserActions.PROFILE_USER_SUCCESS:
      return Object.assign({}, state, { profileUser: action.payload});

    case UserActions.REMOVE_AUTH_SUCCESS:
      return Object.assign({}, state, { user: {}, authError: {}, authData: {} });

    default:
      return state;
  }
};