import { Component, ViewChild } from '@angular/core';
import { Platform, Content, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { UserActions } from '../state/actions/user.actions';
import { GamesActions } from '../state/actions/game.actions';

import { HomePage } from '../pages/home/home';
import { AuthPage } from '../pages/auth/auth.page';
import { ProfilePage } from '../pages/profile/profile.page';
import { GameCategoriesPage } from '../pages/game-categories/game-categories.page';
import { ChatPage } from '../pages/chat/chat.page';

import { IUser } from '../shared/models/user.model';

interface PageObj {
  title: string;
  component?: any;
  icon: string;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Content) content: Content;
  @ViewChild(Nav) nav: Nav;
  rootPage;

  menuPages: PageObj[] = [
    { title: 'Play', icon: 'ios-game-controller-a-outline', component: GameCategoriesPage },
    { title: 'Talk', icon: 'ios-chatboxes-outline', component: ChatPage },
    { title: 'Collab', icon: 'ios-people-outline'},
    { title: 'Stuff', icon: 'ios-cash-outline' },
    { title: 'Settings', icon: 'ios-settings-outline' },
    { title: 'Logout', icon: 'ios-log-out-outline'}
  ];

  // User
  public user$: Observable<IUser>;
  userToken: string;
  userId: string;

  constructor(
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private platform: Platform,
    private store: Store<AppState>,
    private userActions: UserActions,
    private gamesActions: GamesActions,
    private menuCtrl: MenuController
  ) {
    this.initialize();

    this.user$ = store.select(state => state.auth.user);

    this.store.select(state => state.auth.authData).subscribe(authData => {
      this.userToken = authData.token;
      this.userId = authData.userId;
    });
  }

  initialize() {
    this.platform.ready().then(() => {
      this.checkForAuthToken();
      this.getGamesCategories();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  checkForAuthToken() {
    if(this.userToken && this.userId) {
      this.store.dispatch(this.userActions.getUser(this.userId));
      this.rootPage = HomePage;
    } else {
      this.rootPage = AuthPage;
    }
  }

  getGamesCategories() {
    this.store.dispatch(this.gamesActions.getCategories());
  }

  onProfileHeaderClick() {
    this.menuCtrl.close();
    this.nav.setRoot(ProfilePage);
  }

  openPage(page: PageObj) {
    const pageTransition = { animate: true, animation: 'wp-transition', direction: 'forward' };

    if(page.component) {
      this.nav.setRoot(page.component, pageTransition);
      this.menuCtrl.close();
    }

    if(page.title === 'Logout') {
      this.store.dispatch(this.userActions.logoutUser());
      this.nav.setRoot(AuthPage, pageTransition);
      this.menuCtrl.close();
    }
  }
}
