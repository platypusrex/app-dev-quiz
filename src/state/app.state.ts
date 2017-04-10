import { IUserState } from '../state/reducers/user.reducer';
import { IGamesState } from '../state/reducers/games.reducer';


export interface AppState {
  auth: IUserState;
  loading: boolean;
  games: IGamesState
}