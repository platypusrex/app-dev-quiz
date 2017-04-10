import { UserReducer } from './user.reducer';
import { LoadingReducer } from './loading.reducer';
import { GamesReducer } from './games.reducer';

export const RootReducer = {
  auth: UserReducer,
  loading: LoadingReducer,
  games: GamesReducer
};