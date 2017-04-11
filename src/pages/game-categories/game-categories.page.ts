import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { IGameCategories } from '../../shared/models/game-categories.model';

@IonicPage()
@Component({
  selector: 'game-categories-page',
  templateUrl: 'game-categories.page.html'
})
export class GameCategoriesPage {
  gameCategories: IGameCategories;

  constructor(private store: Store<AppState>) {
    this.store.select(state => state.games.categories).subscribe(categories => {
      this.gameCategories = this.convertGameCategoriesToArray(categories);
    });
  }

  convertGameCategoriesToArray(categories: IGameCategories) {
    return Object.keys(categories)
      .map(val => {
        if(val !== '_id' && val !== '_v') return categories[val];
      })
      .filter(val =>  {
        return !!(val);
      })
      .sort((a, b) => {
        return a.displayName.localeCompare(b.displayName);
      });
  }

}