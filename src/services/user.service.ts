import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { IUser } from '../shared/models/user.model';

@Injectable()
export class UserService {
  usersPath:string = 'users/';

  constructor(private api: ApiService) {}

  getUser(userId:string): Observable<any> {
    return this.api.get(`${this.usersPath}${userId}`, true)
      .map(result => {
        return result;
      });
  }

  updateUser(user:IUser): Observable<any> {
    return this.api.put(`${this.usersPath}${user._id}`, user, true)
      .map(result => {
        return result;
      });
  }

  getUsers(query: string): Observable<any> {
    return this.api.get(`${this.usersPath}?search=${query}`, true)
      .map(result => {
        return result;
      });
  }
}