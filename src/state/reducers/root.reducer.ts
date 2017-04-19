import { UserReducer } from './user.reducer';
import { UserSearchReducer } from './user-search.reducer';
import { LoadingReducer } from './loading.reducer';
import { GamesReducer } from './games.reducer';

export const RootReducer = {
  auth: UserReducer,
  userSearch: UserSearchReducer,
  loading: LoadingReducer,
  games: GamesReducer
};