import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { ITriviaQuestion } from '../../shared/models/trivia-question.model';

@Injectable()
export class TriviaQuestionActions {
  static GET_TRIVIA_QUESTION_COLLECTION = 'GET_TRIVIA_QUESTION_COLLECTION';
  getTriviaQuestionCollection(triviaQuestion: ITriviaQuestion[]): Action {
    return {
      type: TriviaQuestionActions.GET_TRIVIA_QUESTION_COLLECTION,
      payload: triviaQuestion
    }
  }

  static CLEAR_TRIVIA_QUESTION = 'CLEAR_TRIVIA_QUESTION';
  clearTriviaQuestion(): Action {
    return {
      type: TriviaQuestionActions.CLEAR_TRIVIA_QUESTION
    }
  }
}