import { NgModule } from '@angular/core';
import { AuthPage } from './auth.page';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [AuthPage],
  imports: [IonicPageModule.forChild(AuthPage)],
  entryComponents: [
    AuthPage
  ]
})
export class AuthPageModule {}