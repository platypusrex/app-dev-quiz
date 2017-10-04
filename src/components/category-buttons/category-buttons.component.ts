import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { IGameCategories, IGameCategory } from '../../shared/models/game-categories.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'category-buttons-cmp',
  templateUrl: 'category-buttons.component.html'
})
export class CategoryButtonsComponent implements OnDestroy {
  gameCategoriesSubscription$: Subscription;
  gameCategories: IGameCategories;
  @Output() emitCategoryClick: EventEmitter<IGameCategory> = new EventEmitter<IGameCategory>();

  constructor(private store: Store<AppState>) {
    this.gameCategoriesSubscription$ = this.store.select(state => state.games.categories).subscribe(categories => {
      this.gameCategories = this.convertGameCategoriesToArray(categories);
    });
  }

  ngOnDestroy() {
    this.gameCategoriesSubscription$.unsubscribe();
  }

  convertGameCategoriesToArray(categories: IGameCategories) {
    return Object.keys(categories)
      .map(val => {
        if(val !== '_id' && val !== '_v') return categories[val];
      })
      .filter(val =>  !!(val))
      .sort((a, b) => a.displayName.localeCompare(b.displayName));
  }

  onCategoryClick(category: IGameCategory) {
    this.emitCategoryClick.emit(category);
  }
}
