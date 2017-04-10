import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';

@Injectable()
export class LoadingService {
  loadingCmp: Loading;
  loading: Subject<Loading> = new Subject<Loading>();
  loadingCmp$ = this.loading.asObservable();

  constructor(private store: Store<AppState>, private loadingCtrl: LoadingController) {
    this.store.select(state => state.loading).subscribe(loading =>  {
      if(loading) {
        this.presentLoading();
      }

      if(!loading && this.loadingCmp) {
        this.loading.next(this.loadingCmp);
      }
    });
  }

  presentLoading() {
    this.loadingCmp = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loadingCmp.present();
  }
}