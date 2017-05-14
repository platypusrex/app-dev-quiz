import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { UserActions } from '../../state/actions/user.actions';
import { ProfileUserActions } from '../../state/actions/profile-user.actions';
import { UserSearchActions } from '../../state/actions/user-search.actions';
import { LoadingService } from '../../services/loading.service';
import { IUser } from '../../shared/models/user.model';
import { Observable, Subscription } from 'rxjs';
import { ProfileEditComponent } from '../../components/profile';
import { FriendProfilePage } from '../friend-profile/friend-profile.page';
import { ProfileConnectionsComponent } from '../../components/profile/profile-connections';

@Component({
  selector: 'profile-page',
  templateUrl: 'profile.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePage implements OnDestroy {
  public user$: Observable<IUser>;
  public users$: Observable<IUser[]>;
  public query$: Observable<string>;
  loadingSubscription$: Subscription;
  showSearchBar: boolean = false;
  showOverlay: boolean = false;
  dismissModal: boolean = false;

  constructor(
    private store: Store<AppState>,
    private userActions: UserActions,
    private profileUserActions: ProfileUserActions,
    private userSearchActions: UserSearchActions,
    private loadingService: LoadingService,
    private modalCtrl: ModalController,
    private navCtrl: NavController
  ) {
    this.user$ = this.store.select(state => state.auth.user);
    this.users$ = this.store.select(state => state.userSearch.result);
    this.query$ = this.store.select(state => state.userSearch.query);

    this.loadingSubscription$ = this.loadingService.loadingCmp$.subscribe(loadingCmp => {
      if(this.dismissModal) {
        loadingCmp.dismiss().then(() => {
          this.dismissModal = false;
        });
      }
    });
  }

  ngOnDestroy() {
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

  followUser(data: {friend: IUser, user: IUser}) {
    const { friend, user } = data;
    let u: IUser = {
      _id: user._id,
      following: user.following
    };

    user.following.push({ userId: friend._id, userName: friend.userName, title: friend.title  });

    this.store.dispatch(this.userActions.updateUser(u));
    this.dismissModal = true;
  }

  showFriendProfile(userId: string) {
    this.showSearchBar = !this.showSearchBar;
    this.showOverlay = false;
    this.store.dispatch(this.profileUserActions.getProfileUser(userId));
    this.navCtrl.push(FriendProfilePage, null, { animation: 'ios-transition' });
    this.store.dispatch(this.userSearchActions.searchUsersCancel());
  }

  onGamesClick() {
    console.log('games')
  }

  onFollowersClick(user: IUser) {
    console.log('followers');
    let modal = this.modalCtrl.create(ProfileConnectionsComponent, { user, users: user.followers });
    modal.present();
  }

  onFollowingClick(user: IUser) {
    let modal = this.modalCtrl.create(ProfileConnectionsComponent, { user, users: user.following });
    modal.present();
  }
}