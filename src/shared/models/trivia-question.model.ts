export interface ITriviaQuestion {
  _id?: string;
  question?: string;
  answer?: string;
  category?: string;
  choices?: string[];
}

export interface IGetTriviaQuestion {
  category: string;
  room?: string;
  id: string | null;
}