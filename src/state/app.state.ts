import { IUserState } from './reducers/user.reducer';
import { IUserSearch } from '../shared/models/user-search.model';
import { IGamesState } from './reducers/games.reducer';
import { IProfileUserState } from './reducers/profile-user.reducer'
import { IChatsState } from './reducers/chats.reducer';
import { ITriviaQuestionState } from '../state/reducers/trivia-question.reducer';

export interface AppState {
  auth: IUserState;
  userSearch: IUserSearch;
  loading: boolean;
  games: IGamesState;
  profileUser: IProfileUserState,
  chats: IChatsState,
  triviaQuestion: ITriviaQuestionState
}