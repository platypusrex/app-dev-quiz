import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MenuController, IonicPage } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { Observable } from 'rxjs';
import { IUser } from '../../shared/models/user.model';
import * as input from '../../shared/constants/input.constants';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {
  @ViewChild('form') form;
  public user$: Observable<IUser>;
  // value: string;
  // inputType: input.IInputType = input.inputType;
  // inputColor: input.IInputColor = input.inputColor;
  // labelType: input.IInputLabelType = input.inputLabelType;

  constructor(private store: Store<AppState>, private menuCtrl: MenuController) {
    this.user$ = this.store.select(state => state.auth.user);
  }

  ngOnInit() {
    this.menuCtrl.open();
  }

  submit() {
    console.log('submit clicked');
  }
}
