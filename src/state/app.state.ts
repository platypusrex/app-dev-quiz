import { IUserState } from '../state/reducers/user.reducer';
import { IUserSearch } from '../shared/models/user-search.model';
import { IGamesState } from '../state/reducers/games.reducer';
import { IProfileUserState } from '../state/reducers/profile-user.reducer'
import { IChatsState } from '../state/reducers/chats.reducer';

export interface AppState {
  auth: IUserState;
  userSearch: IUserSearch;
  loading: boolean;
  games: IGamesState;
  profileUser: IProfileUserState,
  chats: IChatsState
}