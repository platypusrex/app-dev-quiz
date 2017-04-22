import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store'
import { IUser } from '../../shared/models/user.model';

@Injectable()
export class ProfileUserActions {
  static GET_PROFILE_USER = 'GET_PROFILE_USER';
  getProfileUser(userId: string): Action {
    return {
      type: ProfileUserActions.GET_PROFILE_USER,
      payload: userId
    }
  }

  static GET_PROFILE_USER_SUCCESS = 'GET_PROFILE_USER_SUCCESS';
  getProfileUserSuccess(user: IUser): Action {
    return {
      type: ProfileUserActions.GET_PROFILE_USER_SUCCESS,
      payload: user
    }
  }
}