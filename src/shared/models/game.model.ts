export type IGameType =
  'java' |
  'cSharp' |
  'c' |
  'cPlusPlus' |
  'javascript' |
  'python' |
  'php' |
  'elixer' |
  'objectiveC' |
  'ruby' |
  'go' |
  'sql' |
  'scala' |
  'elm' |
  'haskell' |
  'perl' |
  'erlang' |
  'clojure' |
  'css' |
  'html';

export type IGameCategory = 'onePlayer' | 'twoPlayer'
export type IPlayerStatus = 'joined' | 'cancelled';
export type IGameStatus = 'pending' | 'started' | 'cancelled' | 'timedOut' | 'finished';

export interface IGame {
  _id?: string;
  createdOn?: Date;
  room?: string;
  status?: IGameStatus;
  type?: IGameType;
  category?: IGameCategory;
  players?: IPlayer[];
}

export interface ICreateGame {
  room?: string;
  type?: IGameType;
  category?: IGameCategory;
  userName?: string;
}

interface IPlayer {
  _id: string;
  userName?: string;
  status?: IPlayerStatus;
}