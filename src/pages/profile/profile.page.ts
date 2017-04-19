import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { UserSearchActions } from '../../state/actions/user-search.actions';
import { IUser } from '../../shared/models/user.model';
import { Observable } from 'rxjs';
import { ProfileEditComponent } from '../../components/profile';

@Component({
  selector: 'profile-page',
  templateUrl: 'profile.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePage {
  public user$: Observable<IUser>;
  public users$: Observable<IUser[]>;
  showSearchBar: boolean = false;
  showOverlay: boolean = false;

  constructor(
    private store: Store<AppState>,
    private userSearchActions: UserSearchActions,
    private modalCtrl: ModalController
  ) {
    this.user$ = this.store.select(state => state.auth.user);

    this.users$ = this.store.select(state => state.userSearch.result);
  }

  onEditProfileBtnClick() {
    let modal = this.modalCtrl.create(ProfileEditComponent);
    modal.present();
  }

  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
  }

  onInput(e) {
    let val = e.target.value;

    if(val && val.trim().length >= 3) {
      this.store.dispatch(this.userSearchActions.searchUsers(val));
    }
  }

  onFocus() {
    this.showOverlay = true;
  }

  onBlur(e) {
    e.target.value = '';
    this.showOverlay = false;
    this.store.dispatch(this.userSearchActions.searchUsersCancel());
  }
}