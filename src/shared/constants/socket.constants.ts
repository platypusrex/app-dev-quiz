type ISocketEvents = {
  joinRoom: string;
  message: string;
  leaveRoom: string;
  disconnect: string;
}

type IChatEvents = ISocketEvents & {
  newMessage: string;
  typing: string;
  stopTyping: string;
  userTyping: string;
  userStopTyping: string;
}

interface ITwoPlayerGameEvents {
  createTwoPlayerGame: string;
  cancelTwoPlayerGame: string;
  twoPlayerGameCreated: string,
  twoPlayerGameCreatedSuccess: string;
  twoPlayerGameStarted: string,
  twoPlayerGameStartedSuccess: string,
  twoPlayerGameCanceled: string,
  twoPlayerGameEndedSuccess: string;
  leaveTwoPlayerGameRoom: string;
}

interface IOnePlayerGameEvents {
  createOnePlayerGame: string;
  cancelOnePlayerGame: string;
  onePlayerGameCreated: string,
  onePlayerGameCreatedSuccess: string;
  onePlayerGameCanceled: string,
  onePlayerGameEndedSuccess: string;
}

interface ITriviaQuestionEvents {
  newQuestion: string;
  newQuestionSuccess: string;
}

type IGameEvents = ISocketEvents &
  IOnePlayerGameEvents &
  ITwoPlayerGameEvents &
  ITriviaQuestionEvents;

const socketEvents = {
  joinRoom: 'joinRoom',
  message: 'message',
  leaveRoom: 'leaveRoom',
  disconnect: 'disconnect'
};

export const chatEvents: IChatEvents = Object.assign({
  newMessage: 'newMessage',
  typing: 'typing',
  stopTyping: 'stopTyping',
  userTyping: 'userTyping',
  userStopTyping: 'userStopTyping'
}, socketEvents);

export const onePlayerGameEvents: IOnePlayerGameEvents = {
  createOnePlayerGame: 'createOnePlayerGame',
  cancelOnePlayerGame: 'cancelOnePlayerGame',
  onePlayerGameCreated: 'onePlayerGameCreated',
  onePlayerGameCreatedSuccess: 'onePlayerGameCreatedSuccess',
  onePlayerGameCanceled: 'onePlayerGameCanceled',
  onePlayerGameEndedSuccess: 'onePlayerGameEndedSuccess'
};

export const twoPlayerGameEvents: ITwoPlayerGameEvents = {
  createTwoPlayerGame: 'createTwoPlayerGame',
  cancelTwoPlayerGame: 'cancelTwoPlayerGame',
  twoPlayerGameCreated: 'twoPlayerGameCreated',
  twoPlayerGameCreatedSuccess: 'twoPlayerGameCreatedSuccess',
  twoPlayerGameStarted: 'twoPlayerGameStarted',
  twoPlayerGameStartedSuccess: 'twoPlayerGameStartedSuccess',
  twoPlayerGameCanceled: 'twoPlayerGameCanceled',
  twoPlayerGameEndedSuccess: 'twoPlayerGameEndedSuccess',
  leaveTwoPlayerGameRoom: 'leaveTwoPlayerGameRoom'
};

export const triviaQuestionEvents = {
  newQuestion: 'newQuestion',
  newQuestionSuccess: 'newQuestionSuccess'
};

export const gameEvents: IGameEvents =
  Object.assign({}, socketEvents, onePlayerGameEvents, twoPlayerGameEvents, triviaQuestionEvents);