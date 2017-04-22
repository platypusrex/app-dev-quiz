import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { ProfileUserActions } from '../../state/actions/profile-user.actions';
import { IUser } from '../../shared/models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'friend-profile-page',
  templateUrl: 'friend-profile.page.html'
})
export class FriendProfilePage implements OnDestroy {
  public user$: Observable<IUser>;

  constructor(
    private store: Store<AppState>,
    private profileUserActions: ProfileUserActions
  ) {
    this.user$ = this.store.select(state => state.profileUser.user);
  }

  ngOnDestroy() {
    this.store.dispatch(this.profileUserActions.removeProfileUser());
  }
}
