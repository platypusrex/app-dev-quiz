import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { storageGet } from '../shared/utils/storage.util';

@Injectable()
export class ApiService {
  apiBasePath:string = `http://localhost:8000/`;

  constructor(private http: Http) {}

  private addHeaders(needsToken: boolean = false): RequestOptions {
    const token = storageGet('token');
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    if(needsToken) {
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

  get(path:string, needsToken:boolean = false):Observable<any> {
    return this.http.get(`${this.apiBasePath}${path}`, this.addHeaders(needsToken))
      .map(this.getJson)
      .catch(this.handleError);
  }

  post(path:string, body:any, needsToken:boolean = false):Observable<any> {
    return this.http.post(`${this.apiBasePath}${path}`, body, this.addHeaders(needsToken))
      .map(this.getJson)
      .catch(this.handleError);
  }

  put(path:string, body:any, needsToken:boolean = false):Observable<any> {
    return this.http.put(`${this.apiBasePath}${path}`, body, this.addHeaders(needsToken))
      .map(this.getJson)
      .catch(this.handleError);
  }
}