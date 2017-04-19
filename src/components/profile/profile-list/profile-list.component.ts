import { Component, Input } from '@angular/core';
import { IUser } from '../../../shared/models/user.model';

@Component({
  selector: 'profile-list-cmp',
  templateUrl: 'profile-list.component.html'
})
export class ProfileListComponent {
  @Input() users: IUser[];
}