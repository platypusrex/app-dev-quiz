import { Component } from '@angular/core';
import { ModalController, IonicPage } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { IUser } from '../../shared/models/user.model';
import { Observable } from 'rxjs';
import { ProfileEditComponent } from '../../components/profile';

@IonicPage()
@Component({
  selector: 'profile-page',
  templateUrl: 'profile.page.html'
})
export class ProfilePage {
  public user$: Observable<IUser>;

  constructor(
    private store: Store<AppState>,
    private modalCtrl: ModalController
  ) {
    this.user$ = this.store.select(state => state.auth.user);
  }

  onEditProfileBtnClick() {
    let modal = this.modalCtrl.create(ProfileEditComponent);
    modal.present();
  }
}