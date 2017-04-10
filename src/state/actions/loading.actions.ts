import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class LoadingActions {
  static LOADING_START = 'LOADING_START';
  loadingStart(): Action {
    return {
      type: LoadingActions.LOADING_START,
      payload: true
    }
  }

  static LOADING_FINISH = 'LOADING_FINISH';
  loadingFinish(): Action {
    return {
      type: LoadingActions.LOADING_FINISH,
      payload: false
    }
  }
}