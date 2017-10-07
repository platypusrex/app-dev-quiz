import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { AppState } from '../app.state';
import { GamesService } from '../../services/games.service';
import { GamesActions } from '../actions/game.actions';
import 'rxjs/add/operator/mergeMap';
import { Observable } from "rxjs";

@Injectable()
export class GamesEffects {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private gamesService: GamesService,
    private gamesActions: GamesActions,
  ) {}

  @Effect() getGameCategories: Observable<Action> = this.actions$
    .ofType(GamesActions.GET_CATEGORIES)
    .mergeMap(action => this.gamesService.getGameCategories()
      .map(categories => this.gamesActions.getCategoriesSuccess(categories))
      .catch(err => Observable.of(this.gamesActions.getCategoriesFailure(err)))
    );
}