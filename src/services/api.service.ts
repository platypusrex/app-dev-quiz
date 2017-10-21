import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { storageGet } from '../shared/utils/storage.util';

export const apiBasePath: string = `http://10.0.0.84:8000/`;

@Injectable()
export class ApiService {
  constructor(private http: Http) {}

  private addHeaders(addToken: boolean = false): RequestOptions {
    const token = storageGet('token');
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    if(addToken) {
      headers.append('x-access-token', token);
      return new RequestOptions({headers});
    }

    return new RequestOptions({headers});
  }

  private getJson(res: Response) {
    return res.json();
  }

  private handleError(error: Response) {
    return Observable.throw(error.json());
  }

  get(path:string, addToken:boolean = false): Observable<any> {
    return this.http.get(`${apiBasePath}${path}`, this.addHeaders(addToken))
      .map(this.getJson)
      .catch(this.handleError);
  }

  post(path:string, body:any, addToken:boolean = false): Observable<any> {
    return this.http.post(`${apiBasePath}${path}`, body, this.addHeaders(addToken))
      .map(this.getJson)
      .catch(this.handleError);
  }

  put(path:string, body:any, addToken:boolean = false): Observable<any> {
    return this.http.put(`${apiBasePath}${path}`, body, this.addHeaders(addToken))
      .map(this.getJson)
      .catch(this.handleError);
  }
}