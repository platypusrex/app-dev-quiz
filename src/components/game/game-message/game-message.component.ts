import { Component, Input } from '@angular/core';
import { IGame, IGameCategory } from '../../../shared/models/game.model';
import { IChat } from '../../../shared/models/chats.model';
import { animations } from '../../../shared/animations/index';

@Component({
  selector: 'game-message-cmp',
  templateUrl: 'game-message.component.html',
  animations: [
    animations(650, 100, 'ease-in-out')
  ]
})
export class GameMessageComponent {
  @Input() game: IGame;
  @Input() gameType: IGameCategory | null;
  @Input() messages: IChat[];
  @Input() isMessageVisible: boolean;
}