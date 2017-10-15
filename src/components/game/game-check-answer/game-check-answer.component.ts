import { Component, Input, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { animations } from '../../../shared/animations/index';
import { bounceInDown, bounceInOut } from '../../../shared/animations/animations';

@Component({
  selector: 'game-check-answer-cmp',
  templateUrl: 'game-check-answer.component.html',
  animations: [
    animations(550, 100, 'ease-in-out'),
    bounceInOut,
    bounceInDown
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameCheckAnswerComponent implements OnChanges {
  @Input() showMessage: boolean;
  @Input() isCorrect: boolean;
  correctMessages: string[] = [
    'Great job!',
    'Nice work!',
    'Perfect!',
    'Awesome work!',
    'Way to go!'
  ];
  incorrectMessages: string[] = [
    'Sorry dude.',
    'Err...no.',
    `Nope.`,
    'Incorrect.',
    'Maybe next time?'
  ];
  animationsTypes: string[] = [
    'fadeIn',
    'rotateIn',
    'zoomIn',
    'slideIn',
    'bounceIn'
  ];
  animationDirections: string[] = [
    'Down',
    'Left',
    'Right',
  ];
  animation: string;
  message: string;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(thing) {
    this.animation = this.animationsTypes[this.getRandomNum(0,5)] + this.animationDirections[this.getRandomNum(0,3)];
    this.message = this.isCorrect ?
      this.correctMessages[this.getRandomNum(0, 5)] :
      this.incorrectMessages[this.getRandomNum(0, 5)];
    this.cdr.markForCheck();
  }

  getRandomNum(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min));
  }
}