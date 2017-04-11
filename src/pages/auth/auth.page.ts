import { Component, Renderer, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AlertController, NavController, IonicPage } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserActions } from '../../state/actions/user.actions';
import { AppState } from '../../state/app.state';
import { LoadingService } from '../../services/loading.service';
import { IUser } from '../../shared/models/user.model';
import * as input from '../../shared/constants/input.constants';
import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'auth-page',
  templateUrl: 'auth.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthPage implements OnDestroy {
  public user: IUser;
  public authError: {type?: string, message?: string};
  authSubscription$: Subscription;
  loadingSubscription$: Subscription;

  @ViewChild('authForm') authForm;
  formType:string = 'register';
  inputType: input.IInputType = input.inputType;
  inputColor: input.IInputColor = input.inputColor;
  labelType: input.IInputLabelType = input.inputLabelType;

  // form models
  email: string;
  password: string;
  userName: string;

  constructor(
    private renderer: Renderer,
    private ref: ElementRef,
    private store: Store<AppState>,
    private userActions: UserActions,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private changeDetector: ChangeDetectorRef,
    private loadingService: LoadingService
  ) {

    this.authSubscription$ = this.store.select(state => state.auth).subscribe(auth => {
      if(Object.keys(auth.authError).length) {
        this.authForm.resetForm();
        this.authError = auth.authError;
        this.changeDetector.markForCheck();
      }

      if(Object.keys(auth.user).length) {
        this.user = auth.user;
        this.changeDetector.markForCheck();
      }
    });

    this.loadingSubscription$ = this.loadingService.loadingCmp$.subscribe(loadingCmp => {
      loadingCmp.dismiss().then(() => {
        if(!this.authError && this.user) {
          this.authSuccess();
        }
      });
    });
  }

  ngOnDestroy() {
    this.authSubscription$.unsubscribe();
    this.loadingSubscription$.unsubscribe();
  }

  clearModelValues() {
    this.email = undefined;
    this.password = undefined;
    this.userName = undefined;
  }

  onClearError() {
    this.authError = undefined;
  }

  resetForm(formType: string) {
    this.formType = formType;
    this.authForm.resetForm();
    this.clearModelValues();

    let labels = this.ref.nativeElement.querySelectorAll('.active-input');

    if(labels.length > 0) {
      for(let i = 0; i < labels.length; i++) {
        this.renderer.setElementClass(labels[i], 'active-input', false);
      }
    }
  }

  onRegisterBtnClick() {
    this.resetForm('register');
  }

  onSignInBtnClick() {
    this.resetForm('signIn');
  }

  authSuccess() {
    if(this.formType === 'register') {
      this.accountCreationAlert();
    } else {
      this.navCtrl.setRoot(HomePage);
    }
  }

  accountCreationAlert() {
    let alert = this.alertCtrl.create({
      message: 'Account created successfully!',
      cssClass: 'account-creation-alert',
      buttons: [
        {
          text: 'Cool',
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });
    alert.present();
  }

  registerUser() {
    const user: IUser = {
      email: this.email,
      password: this.password,
      userName: this.userName,
      createdOn: new Date()
    };

    this.store.dispatch(this.userActions.registerUser(user));
  }

  loginUser() {
    const user: { email: string, password: string } = {
      email: this.email,
      password: this.password,
    };

    this.store.dispatch(this.userActions.loginUser(user));
  }

  submitAuthForm() {
    if(this.formType === 'register') {
      this.registerUser()
    } else {
      this.loginUser();
    }
  }
}