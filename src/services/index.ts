import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { LoadingService } from './loading.service';
import { GamesService } from './games.service';
import { GameSocketService } from './game-socket.service';
import { ChatsService } from './chats.service';
import { ChatSocketService } from './chat-socket.service';

export const APP_SERVICES = [
  ApiService,
  AuthService,
  UserService,
  LoadingService,
  GamesService,
  GameSocketService,
  ChatsService,
  ChatSocketService
];