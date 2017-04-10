import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class GamesService {
  gamesPath: string = 'games/';

  constructor(private api: ApiService) {}

  getGameCategories(): Observable<any> {
    return this.api.get(this.gamesPath)
      .map(result => {
        return result[0];
      });
  }
}