import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { Observable } from 'rxjs';
import { IUser } from '../../shared/models/user.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {
  @ViewChild('form') form;
  public user$: Observable<IUser>;

  constructor(private store: Store<AppState>, private menuCtrl: MenuController) {
    this.user$ = this.store.select(state => state.auth.user);
  }

  ngOnInit() {
    this.menuCtrl.open();
  }
}
