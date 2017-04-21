import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { IUser } from '../../../shared/models/user.model';

@Component({
  selector: 'profile-list-cmp',
  templateUrl: 'profile-list.component.html'
})
export class ProfileListComponent implements OnChanges {
  @Input() currentUser: IUser;
  @Input() users: IUser[];
  @Output() emitFollowUser: EventEmitter<string> = new EventEmitter<string>();

  ngOnChanges() {
    const followingIds = this.getFollowingIds(this.currentUser);

    this.users.forEach(val => {
      if(followingIds && followingIds.includes(val._id)) {
        val['isFollowed'] = true;
      }
    });
  }

  getFollowingIds(user) {
    if(user && user.following.length) {
      return user.following.map(val => { return val.userId });
    }
  }

  followUser(userId: string) {
    this.emitFollowUser.emit(userId);
  }
}