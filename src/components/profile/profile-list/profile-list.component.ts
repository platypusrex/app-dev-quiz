import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { IUser } from '../../../shared/models/user.model';

@Component({
  selector: 'profile-list-cmp',
  templateUrl: 'profile-list.component.html'
})
export class ProfileListComponent implements OnChanges {
  @Input() user: IUser;
  @Input() users: IUser[];
  @Output() emitFollowUser: EventEmitter<{friend: IUser, user: IUser}> = new EventEmitter<{friend: IUser, user: IUser}>();
  @Output() emitShowFriendProfile: EventEmitter<string> = new EventEmitter<string>();

  ngOnChanges() {
    const followingIds = this.getFollowingIds(this.user);

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

  followUser(friend: IUser, e: Event) {
    e.stopPropagation();
    this.emitFollowUser.emit({friend , user: this.user});
  }

  showFriendProfile(userId: string) {
    this.emitShowFriendProfile.emit(userId);
  }
}