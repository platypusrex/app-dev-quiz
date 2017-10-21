import { ActionReducer, Action } from '@ngrx/store';
import { TriviaQuestionActions } from '../actions/trivia-question.actions';
import { ITriviaQuestion} from '../../shared/models/trivia-question.model';

export interface ITriviaQuestionState {
  triviaQuestions: ITriviaQuestion[] | null;
  error: string | null;
}

const initialState: ITriviaQuestionState = {
  triviaQuestions: null,
  error: null
};

export const TriviaQuestionReducer: ActionReducer<any> = (state: ITriviaQuestionState = initialState, action: Action) => {
  switch(action.type) {
    case TriviaQuestionActions.GET_TRIVIA_QUESTION_COLLECTION:
      return {...state, triviaQuestions: {...state.triviaQuestions, ...action.payload}};

    case TriviaQuestionActions.CLEAR_TRIVIA_QUESTION:
      return initialState;

    default:
      return state;
  }
};