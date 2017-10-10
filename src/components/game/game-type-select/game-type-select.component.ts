import { Component, Input, Output, EventEmitter } from '@angular/core';
import { animations } from '../../../shared/animations/index';
import { IGame } from '../../../shared/models/game.model';

@Component({
  selector: 'game-type-select-cmp',
  templateUrl: 'game-type-select.component.html',
  animations: [
    animations(650, 100, 'ease-in-out')
  ]
})
export class GameTypeSelectComponent {
  @Input() game: IGame;
  @Output() emitOnePlayerGameSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output() emitTwoPlayerGameSelect: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    console.log()
  }

  handleOnePlayerGameSelect() {
    this.emitOnePlayerGameSelect.emit();
  }

  handleTwoPlayerGameSelect() {
    this.emitTwoPlayerGameSelect.emit();
  }
}