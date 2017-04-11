import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { APP_PAGES } from '../pages';
import { APP_COMPONENTS } from '../components';
import { APP_SERVICES } from '../services';
import { SHARED_COMPONENTS } from '../shared/components';
import { SHARED_DIRECTIVES } from '../shared/directives';

import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects';

import { RootReducer } from '../state/reducers/root.reducer';
import { ACTIONS } from '../state/actions';
import { UserEffects } from '../state/effects/user.effects';
import { GamesEffects } from '../state/effects/games.effects';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    ...APP_PAGES,
    ...APP_COMPONENTS,
    ...SHARED_COMPONENTS,
    ...SHARED_DIRECTIVES
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      menuType: 'overlay'
    }),
    StoreModule.provideStore(RootReducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    }),
    EffectsModule.run(UserEffects),
    EffectsModule.run(GamesEffects)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ...APP_PAGES,
    ...APP_COMPONENTS,
    ...SHARED_COMPONENTS
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ...ACTIONS,
    ...APP_SERVICES
  ]
})
export class AppModule {}
