import { NgModule } from '@angular/core';
import { ProfilePage } from './profile.page';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [ProfilePage],
  imports: [IonicPageModule.forChild(ProfilePage)],
})
export class ProfilePageModule {}