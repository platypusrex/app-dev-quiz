import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { IGameCategories } from '../../shared/models/game-categories.model';
import { IGame } from '../../shared/models/game.model';
import { IChat } from '../../shared/models/chats.model';

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

  static UPDATE_GAME_DATA = 'UPDATE_GAME_DATA';
  updateGameData(gameData: IGame): Action {
    return {
      type: GamesActions.UPDATE_GAME_DATA,
      payload: gameData
    }
  }

  static UPDATE_GAME_MESSAGES = 'UPDATE_GAME_MESSAGES';
  updateGameMessages(message: IChat): Action {
    return {
      type: GamesActions.UPDATE_GAME_MESSAGES,
      payload: message
    }
  }

  static CLEAR_GAME_DATA = 'CLEAR_GAME_DATA';
  clearGameData(): Action {
    return {
      type: GamesActions.CLEAR_GAME_DATA
    }
  }
}