import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from '../../../shared/models/user.model';

@Component({
  selector: 'profile-head-cmp',
  templateUrl: 'profile-head.component.html'
})
export class ProfileHeadComponent {
  @Input() user: IUser;
  @Input() isFriendProfile: boolean;
  @Output() editProfile: EventEmitter<any> = new EventEmitter<any>();
  @Output() onGamesClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() onFollowingClick: EventEmitter<IUser> = new EventEmitter<IUser>();
  @Output() onFollowersClick: EventEmitter<IUser> = new EventEmitter<IUser>();

  onProfileEditBtnClick() {
    this.editProfile.emit();
  }

  handleGamesClick() {
    this.onGamesClick.emit();
  }

  handleFollowersClick() {
    this.onFollowersClick.emit(this.user);
  }

  handleFollowingClick() {
    this.onFollowingClick.emit(this.user);
  }
}