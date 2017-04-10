export interface IFollower {
  userId: string;
}

export interface IGameData {
  total?: number;
  won?: number;
  lost?: number;
}

export interface IUser {
  _id?: string;
  email?: string;
  password?: string;
  userName?: string;
  title?: string;
  description?: string;
  createdOn?: Date,
  lastActive?: Date,
  followers?: IFollower[],
  following?: IFollower[],
  games?: IGameData[]
}