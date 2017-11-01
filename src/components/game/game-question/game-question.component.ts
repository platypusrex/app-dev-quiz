import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ITriviaQuestion } from '../../../shared/models/trivia-question.model';

interface PlayerAnswer {
  choice: string;
  triviaQuestion: ITriviaQuestion;
}

@Component({
  selector: 'game-question-cmp',
  templateUrl: 'game-question.component.html'
})
export class GameQuestionComponent {
  @Input() triviaQuestion: ITriviaQuestion;
  @Input() areGameButtonsActive: boolean;
  @Output() emitPlayerAnswerSelection: EventEmitter<PlayerAnswer> = new EventEmitter<PlayerAnswer>();

  handlePlayerAnswerSelection(choice: string, triviaQuestion: ITriviaQuestion) {
    if (this.areGameButtonsActive) {
      this.emitPlayerAnswerSelection.emit({choice, triviaQuestion});
    }
  }
}