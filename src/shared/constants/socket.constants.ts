interface ISocketEvents {
  joinRoom: string;
  message: string;
  leaveRoom: string;
  disconnect: string;
}

interface IChatEvents extends ISocketEvents {
  newMessage: string;
  typing: string;
  stopTyping: string;
  userTyping: string;
  userStopTyping: string;
}

interface IGameEvents extends ISocketEvents {
  gameCreated: string;
  gameCreatedSuccess: string;
  gameStarted: string;
  gameStartedSuccess: string;
  gameEnded: string;
  createTwoPlayerGame: string;
}

const socketEvents = {
  joinRoom: 'joinRoom',
  message: 'message',
  leaveRoom: 'leaveRoom',
  disconnect: 'disconnect'
};

export const chatEvents = {
  ...socketEvents,
  newMessage: 'newMessage',
  typing: 'typing',
  stopTyping: 'stopTyping',
  userTyping: 'userTyping',
  userStopTyping: 'userStopTyping'
} as IChatEvents;

export const gameEvents = {
  ...socketEvents,
  gameCreated: 'gameCreated',
  gameCreatedSuccess: 'gameCreatedSuccess',
  gameStarted: 'gameStarted',
  gameStartedSuccess: 'gameStartedSuccess',
  gameEnded: 'gameEnded',
  createTwoPlayerGame: 'createTwoPlayerGame'
} as IGameEvents;