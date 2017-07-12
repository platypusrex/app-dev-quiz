import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { LoadingService } from './loading.service';
import { GamesService } from './games.service';
import { ChatsService } from './chats.service';

export const APP_SERVICES = [
  ApiService,
  AuthService,
  UserService,
  LoadingService,
  GamesService,
  ChatsService
];