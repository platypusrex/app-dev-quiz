import { Component, ViewChild, OnDestroy } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../../state/app.state';
import { UserActions } from '../../../state/actions/user.actions';
import { LoadingService } from '../../../services/loading.service';
import { IUser } from '../../../shared/models/user.model';
import * as input from '../../../shared/constants/input.constants';

@Component({
  selector: 'profile-edit-cmp',
  templateUrl: 'profile-edit.component.html'
})
export class ProfileEditComponent implements OnDestroy {
  @ViewChild('profileEditForm') profileEditForm;
  userSubscription$: Subscription;
  loadingSubscription$: Subscription;
  inputType: input.IInputType = input.inputType;
  inputColor: input.IInputColor = input.inputColor;
  labelType: input.IInputLabelType = input.inputLabelType;
  labelHelper: string = 'character(s)';
  userNameLabelHelper: string = 'required';
  descCharMax: number = 140;
  titleCharMax: number = 30;

  // form models
  user: IUser;
  id: string;
  userName: string;
  title: string;
  description: string;
  authError: {type?: string, message?: string};

  constructor(
    private store: Store<AppState>,
    private userActions: UserActions,
    private loadingService: LoadingService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {

    this.userSubscription$ = this.store.select(state => state.auth).subscribe(auth => {
      this.user = auth.user;
      this.id = auth.user._id;
      this.userName = auth.user.userName;
      this.title = auth.user.title;
      this.description = auth.user.description;
      this.authError = auth.authError;
    });

    this.loadingSubscription$ = this.loadingService.loadingCmp$.subscribe(loadingCmp => {
      loadingCmp.dismiss().then(() => {
        if(!Object.keys(this.authError).length) this.profileUpdateSuccessAlert();
      })
    });

  }

  ngOnDestroy() {
    this.userSubscription$.unsubscribe();
    this.loadingSubscription$.unsubscribe();
  }

  profileUpdateSuccessAlert() {
    let alert = this.alertCtrl.create({
      title: 'Changes saved!',
      message: `Good to go, <strong>${this.userName}</strong>.`,
      cssClass: 'user-update-alert',
      buttons: [
        {
          text: 'Cool',
          handler: () => {
            this.navCtrl.pop()
          }
        }
      ]
    });
    alert.present();
  }

  closeModal() {
    this.navCtrl.pop();
  }

  submitProfileEditForm() {
    const user: IUser = {
      userName: this.user.userName,
      title: this.user.title,
      description: this.user.description,
      _id: this.user._id
    };

    if(this.profileEditForm.form.valid) {
      this.store.dispatch(this.userActions.updateUser(user));
    }
  }
}