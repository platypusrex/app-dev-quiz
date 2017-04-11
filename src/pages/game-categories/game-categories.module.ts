import { NgModule } from '@angular/core';
import { GameCategoriesPage } from './game-categories.page';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [GameCategoriesPage],
  imports: [IonicPageModule.forChild(GameCategoriesPage)],
})
export class GameCategoriesModule {}