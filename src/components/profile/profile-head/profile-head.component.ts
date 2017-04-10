import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IGameData, IFollower } from '../../../shared/models/user.model';

@Component({
  selector: 'profile-head-cmp',
  templateUrl: 'profile-head.component.html'
})
export class ProfileHeadComponent {
  @Input() userName: string;
  @Input() createdOn: Date;
  @Input() title: string;
  @Input() description: string;
  @Input() games: IGameData[];
  @Input() followers: IFollower[];
  @Input() following: IFollower[];
  @Output() editProfile: EventEmitter<any> = new EventEmitter<any>();

  onProfileEditBtnClick() {
    this.editProfile.emit();
  }
}