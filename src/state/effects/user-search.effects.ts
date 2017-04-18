import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { UserSearchActions } from '../actions/user-search.actions';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';

@Injectable()
export class UserSearchEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private userSearchActions: UserSearchActions
  ) {}

  @Effect() searchUsers$: Observable<Action> = this.actions$
    .ofType(UserSearchActions.SEARCH_USERS)
    .mergeMap(action => this.userService.getUsers(action.payload)
      .map(users => this.userSearchActions.searchUsersSuccess(users))
    )
}