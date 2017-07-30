export interface IChat {
  _id?: string;
  createdOn?: Date;
  message?: string;
  roomName?: string;
  userName?: string;
}

export interface IUserTyping {
  userName?: string;
  isTyping?: boolean;
}