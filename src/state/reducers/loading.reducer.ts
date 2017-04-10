import { ActionReducer, Action } from '@ngrx/store';
import { LoadingActions } from '../actions/loading.actions';

const loading:boolean = false;

export const LoadingReducer: ActionReducer<any> = (state:boolean = loading, action: Action) => {
  switch(action.type) {
    case LoadingActions.LOADING_START:
      return action.payload;

    case LoadingActions.LOADING_FINISH:
      return action.payload;

    default:
      return state;
  }
};