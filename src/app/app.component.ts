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

import { IUser } from '../shared/models/user.model';
import { storageGet, storageRemove } from '../shared/utils/storage.util';

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
    { title: 'Talk', icon: 'ios-chatboxes-outline' },
    { title: 'Collab', icon: 'ios-people-outline'},
    { title: 'Stuff', icon: 'ios-cash-outline' },
    { title: 'Settings', icon: 'ios-settings-outline' },
    { title: 'Logout', icon: 'ios-log-out-outline'}
  ];

  // User
  public user$: Observable<IUser>;
  userToken:string = storageGet('token');
  userId:string = storageGet('userId');

  // GamesCategories
  games: any;

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

    this.store.select(state => state.games).subscribe(games => {
      this.games = games;
    });
  }

  deleteLocalStore() {
    storageRemove('token');
    storageRemove('userId');
    this.userToken = '';
    this.userId = '';
  }

  initialize() {
    //this.deleteStore();
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
      this.deleteLocalStore();
      this.store.dispatch(this.userActions.logoutUser());
      this.nav.setRoot(AuthPage, pageTransition);
      this.menuCtrl.close();
    }
  }
}
