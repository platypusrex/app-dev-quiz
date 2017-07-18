import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular'
import { GameSelectComponent } from '../../components/game-select';
import { IGameCategory } from '../../shared/models/game-categories.model';

@Component({
  selector: 'games-page',
  templateUrl: 'games.page.html'
})
export class GamesPage {
  constructor(private modalCtrl: ModalController) {}

  onCategoryClick(category: IGameCategory) {
    let modal = this.modalCtrl.create(GameSelectComponent, {category});
    modal.present();
  }
}