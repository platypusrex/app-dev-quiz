import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { IUser } from '../shared/models/user.model';
import { storageSet, storageRemove } from '../shared/utils/storage.util';

@Injectable()
export class AuthService {
  registerPath:string = 'register';
  loginPath:string = 'login';

  constructor(private api: ApiService){}

  private setLocalStore(data:{token:string, user:IUser}) {
    storageSet('token', data.token);
    storageSet('userId', data.user._id);
  }

  private removeLocalStore() {
    storageRemove('token');
    storageRemove('userId');
  }

  register(user: IUser): Observable<any> {
    return this.api.post(this.registerPath, user)
      .map(result => {
        this.setLocalStore(result);
        return result.user;
      });
  }

  login(params:{email:string, password:string}): Observable<any> {
    return this.api.post(this.loginPath, params)
      .map(result => {
        this.setLocalStore(result);
        return result.user;
      });
  }

  logout(): Observable<any> {
    this.removeLocalStore();
    return Observable.empty()
  }
}