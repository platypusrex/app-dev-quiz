import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular'
import { GameRoomComponent } from '../../components/game/game-room/game-room.component';
import { IGameCategory } from '../../shared/models/game-categories.model';

@Component({
  selector: 'games-page',
  templateUrl: 'games.page.html'
})
export class GamesPage {
  constructor(private modalCtrl: ModalController) {}

  onCategoryClick(category: IGameCategory) {
    let modal = this.modalCtrl.create(GameRoomComponent, {category});
    modal.present();
  }
}