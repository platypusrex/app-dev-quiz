import { Component, Input } from '@angular/core';
import { IUser } from '../../../shared/models/user.model';

@Component({
  selector: 'profile-followers-cmp',
  templateUrl: 'profile-followers.component.html'
})
export class ProfileFollowersComponent {
  @Input() user;
  @Input() users: IUser;
}