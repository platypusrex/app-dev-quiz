import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { AppState } from '../app.state';
import { UserActions } from '../actions/user.actions';
import { LoadingActions } from '../actions/loading.actions';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import { Observable } from "rxjs";

@Injectable()
export class UserEffects {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService,
    private userActions: UserActions,
    private loadingActions: LoadingActions
  ) {}

  @Effect() registerUser$: Observable<Action> = this.actions$
    .ofType(UserActions.REGISTER_USER)
    .do(() => this.store.dispatch(this.loadingActions.loadingStart()))
    .mergeMap(action => this.authService.register(action.payload)
      .map(user => this.userActions.userSuccess(user))
      .catch(err => Observable.of(this.userActions.userFailure(err)))
    )
    .mergeMap((action) => {
      return Observable.of(action, this.loadingActions.loadingFinish());
    });

  @Effect() loginUser$: Observable<Action> = this.actions$
    .ofType(UserActions.LOGIN_USER)
    .do(() => this.store.dispatch(this.loadingActions.loadingStart()))
    .mergeMap(action => this.authService.login(action.payload)
      .map(user => this.userActions.userSuccess(user))
      .catch(err => Observable.of(this.userActions.userFailure(err)))
    )
    .mergeMap((action) => {
      return Observable.of(action, this.loadingActions.loadingFinish());
    });

  @Effect() logoutUser$: Observable<Action> = this.actions$
    .ofType(UserActions.LOGOUT_USER)
    .mergeMap(action => this.authService.logout()
      .map(() => this.userActions.removeAuthSuccess())
    );

  @Effect() getUser$: Observable<Action> = this.actions$
    .ofType(UserActions.GET_USER)
    .mergeMap(action => this.userService.getUser(action.payload)
      .map(user => this.userActions.userSuccess(user))
      .catch(err => Observable.of(this.userActions.userFailure(err)))
    );

  @Effect() updateUser$: Observable<Action> = this.actions$
    .ofType(UserActions.UPDATE_USER)
    .do(() => this.store.dispatch(this.loadingActions.loadingStart()))
    .mergeMap(action => this.userService.updateUser(action.payload)
      .map(user => this.userActions.userSuccess(user))
      .catch(err => Observable.of(this.userActions.userFailure(err)))
    )
    .mergeMap((action) =>  {
      return Observable.of(action, this.loadingActions.loadingFinish());
    })
}