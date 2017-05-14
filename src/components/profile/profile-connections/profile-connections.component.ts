import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { IUser } from '../../../shared/models/user.model';

@Component({
  selector: 'profile-connections-cmp',
  templateUrl: 'profile-connections.component.html'
})
export class ProfileConnectionsComponent {
  user: IUser;
  users: IUser[];

  constructor(
    private navParams: NavParams,
    private viewCtrl: ViewController
  ) {
    if(navParams.get('user')) {
      this.user = navParams.get('user');
      this.users = navParams.get('users');
    }
  }

  closeModal(e) {
    this.viewCtrl.dismiss();
  }
}