import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store'
import { IUser } from '../../shared/models/user.model';

@Injectable()
export class UserActions {
  static REGISTER_USER = 'REGISTER_USER';
  registerUser(user: IUser): Action {
    return {
      type: UserActions.REGISTER_USER,
      payload: user
    }
  }

  static LOGIN_USER = 'LOGIN_USER';
  loginUser(params:{email: string, password: string}): Action {
    return {
      type: UserActions.LOGIN_USER,
      payload: params
    }
  }

  static LOGOUT_USER = 'LOGOUT_USER';
  logoutUser(): Action {
    return {
      type: UserActions.LOGOUT_USER
    }
  }

  static GET_USER = 'GET_USER';
  getUser(userId: string): Action {
    return {
      type: UserActions.GET_USER,
      payload: userId
    }
  }

  static UPDATE_USER = 'UPDATE_USER';
  updateUser(user: IUser): Action {
    return {
      type: UserActions.UPDATE_USER,
      payload: user
    }
  }

  static USER_SUCCESS = 'USER_SUCCESS';
  userSuccess(user: IUser): Action {
    return {
      type: UserActions.USER_SUCCESS,
      payload: user
    }
  }

  static USER_FAILURE = 'USER_FAILURE';
  userFailure(err): Action {
    return {
      type: UserActions.USER_FAILURE,
      payload: err
    }
  }
}