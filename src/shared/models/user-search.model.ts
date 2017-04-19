import { IUser } from './user.model';

export interface IUserSearch {
  query?: string;
  isSearching?: boolean;
  result: IUser[];
}