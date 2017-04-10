import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { IGameCategories } from '../../shared/models/game-categories.model';

@Injectable()
export class GamesActions {
  static GET_CATEGORIES = 'GET_CATEGORIES';
  getCategories(): Action {
    return {
      type: GamesActions.GET_CATEGORIES
    }
  }

  static GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
  getCategoriesSuccess(gameCategories: IGameCategories): Action {
    return {
      type: GamesActions.GET_CATEGORIES_SUCCESS,
      payload: gameCategories
    }
  }

  static GET_CATEGORIES_FAILURE = 'GET_CATEGORIES_FAILURE';
  getCategoriesFailure(err): Action {
    return {
      type: GamesActions.GET_CATEGORIES_SUCCESS,
      payload: err
    }
  }
}