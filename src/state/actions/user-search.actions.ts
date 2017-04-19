import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { IUser } from '../../shared/models/user.model';

@Injectable()
export class UserSearchActions {
  static SEARCH_USERS = 'SEARCH_USERS';
  searchUsers(query: string): Action {
    return {
      type: UserSearchActions.SEARCH_USERS,
      payload: query
    }
  }

  static SEARCH_USERS_SUCCESS = 'SEARCH_USERS_SUCCESS';
  searchUsersSuccess(users: IUser[]): Action {
    return {
      type: UserSearchActions.SEARCH_USERS_SUCCESS,
      payload: users
    }
  }

  static SEARCH_USERS_CANCEL = 'SEARCH_USERS_CANCEL';
  searchUsersCancel(): Action {
    return {
      type: UserSearchActions.SEARCH_USERS_CANCEL
    }
  }
}