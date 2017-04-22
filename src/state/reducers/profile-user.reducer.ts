import { ActionReducer, Action } from '@ngrx/store';
import { ProfileUserActions } from '../actions/profile-user.actions';
import { IUser } from '../../shared/models/user.model';

export interface IProfileUserState {
  user: IUser
}

const initialState: IProfileUserState = {
  user: {}
};

export const ProfileUserReducer: ActionReducer<any> = (state: IProfileUserState = initialState, action: Action) => {
  switch(action.type) {
    case ProfileUserActions.GET_PROFILE_USER_SUCCESS:
      return Object.assign({}, state, { user: action.payload });

    default:
      return state;
  }
};