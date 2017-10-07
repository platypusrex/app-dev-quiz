import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { ITriviaQuestion } from '../../shared/models/trivia-question.model';

@Injectable()
export class TriviaQuestionActions {
  static UPDATE_TRIVIA_QUESTION = 'UPDATE_TRIVIA_QUESTION';
  updateTriviaQuestion(triviaQuestion: ITriviaQuestion): Action {
    console.log('action', triviaQuestion);
    return {
      type: TriviaQuestionActions.UPDATE_TRIVIA_QUESTION,
      payload: triviaQuestion
    }
  }

  static CLEAR_TRIVIA_QUESTION = 'CLEAR_TRIVIA_QUESTION';
  clearTriviaQuestion(): Action {
    console.log('clear action');
    return {
      type: TriviaQuestionActions.CLEAR_TRIVIA_QUESTION
    }
  }
}