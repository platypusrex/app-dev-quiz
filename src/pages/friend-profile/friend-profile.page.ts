import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { IUser } from '../../shared/models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'friend-profile-page',
  templateUrl: 'friend-profile.page.html'
})
export class FriendProfilePage {
  public user$: Observable<IUser>;

  constructor(private store: Store<AppState>) {
    this.user$ = this.store.select(state => state.profileUser.user);
  }
}
