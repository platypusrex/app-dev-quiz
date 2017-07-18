import { NgModule } from '@angular/core';
import { GamesPage } from './games.page';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [GamesPage],
  imports: [IonicPageModule.forChild(GamesPage)],
})
export class GameCategoriesModule {}