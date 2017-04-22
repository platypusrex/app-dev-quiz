import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { AppState } from '../app.state';
import { ProfileUserActions } from '../actions/profile-user.actions';
import { UserService } from '../../services/user.service';
import 'rxjs/add/operator/mergeMap';
import { Observable } from "rxjs";

@Injectable()
export class ProfileUserEffects {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private userService: UserService,
    private profileUserActions: ProfileUserActions
  ) {}

  @Effect() getProfileUser$: Observable<Action> = this.actions$
    .ofType(ProfileUserActions.GET_PROFILE_USER)
    .mergeMap(action =>  this.userService.getUserForProfile(action.payload)
      .map(user => this.profileUserActions.getProfileUserSuccess(user))
    )
}