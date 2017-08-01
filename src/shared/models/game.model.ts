export interface IGame {
  _id?: string;
  createdOn?: Date;
  room?: string;
  status?: 'started' | 'pending';
  type?: string;
  players?: IPlayer[];
}

export interface ICreateGame {
  room?: string;
  type?: string;
  userName?: string;
}

interface IPlayer {
  _id: string;
  userName?: string;
  status?: 'joined';
}