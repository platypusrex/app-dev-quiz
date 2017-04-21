import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { UserActions } from '../../state/actions/user.actions';
import { UserSearchActions } from '../../state/actions/user-search.actions';
import { LoadingService } from '../../services/loading.service';
import { IUser } from '../../shared/models/user.model';
import { Observable, Subscription } from 'rxjs';
import { ProfileEditComponent } from '../../components/profile';

@Component({
  selector: 'profile-page',
  templateUrl: 'profile.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePage implements OnDestroy {
  public profileUser$: Observable<IUser>;
  public users$: Observable<IUser[]>;
  public query$: Observable<string>;
  userSubscription$: Subscription;
  loadingSubscription$: Subscription;
  user: IUser;
  showSearchBar: boolean = false;
  showOverlay: boolean = false;

  constructor(
    private store: Store<AppState>,
    private userActions: UserActions,
    private userSearchActions: UserSearchActions,
    private loadingService: LoadingService,
    private modalCtrl: ModalController
  ) {
    this.profileUser$ = this.store.select(state => state.auth.profileUser);
    this.users$ = this.store.select(state => state.userSearch.result);
    this.query$ = this.store.select(state => state.userSearch.query);

    this.userSubscription$ = this.store.select(state => state.auth.user).subscribe(user => {
      this.user = user;
    });

    this.loadingSubscription$ = this.loadingService.loadingCmp$.subscribe(loadingCmp => {
      loadingCmp.dismiss();
    });
  }

  ngOnDestroy() {
    this.userSubscription$.unsubscribe();
    this.loadingSubscription$.unsubscribe();
  }

  onEditProfileBtnClick() {
    let modal = this.modalCtrl.create(ProfileEditComponent);
    modal.present();
  }

  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;

    if(!this.showSearchBar) {
      this.showOverlay = false;
      this.store.dispatch(this.userSearchActions.searchUsersCancel());
    }
  }

  onInput(query: string) {
    if(query && query.trim().length >= 3) {
      this.store.dispatch(this.userSearchActions.searchUsers(query));
    }
  }

  onFocus() {
    this.showOverlay = true;
  }

  followUser(userId: string) {
    let user: IUser = {
      _id: this.user._id,
      following: this.user.following
    };

    user.following.push({ userId });

    this.store.dispatch(this.userActions.updateUser(user));
  }
}