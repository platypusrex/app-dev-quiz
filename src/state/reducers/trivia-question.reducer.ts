import { ActionReducer, Action } from '@ngrx/store';
import { TriviaQuestionActions } from '../actions/trivia-question.actions';
import { ITriviaQuestion} from '../../shared/models/trivia-question.model';

export interface ITriviaQuestionState {
  triviaQuestion: ITriviaQuestion;
}

const initialState: ITriviaQuestionState = {
  triviaQuestion: {}
};

export const TriviaQuestionReducer: ActionReducer<any> = (state: ITriviaQuestionState = initialState, action: Action) => {
  switch(action.type) {
    case TriviaQuestionActions.UPDATE_TRIVIA_QUESTION:
      console.log('reducer');
      return {...state, triviaQuestion: {...state.triviaQuestion, ...action.payload}};

    case TriviaQuestionActions.CLEAR_TRIVIA_QUESTION:
      return initialState;

    default:
      return state;
  }
};