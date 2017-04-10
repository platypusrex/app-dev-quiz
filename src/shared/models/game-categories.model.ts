export interface IGameCategory {
  type?: string;
  displayName?: string;
}

export interface IGameCategories {
  java?: IGameCategory,
  cSharp?: IGameCategory,
  c?: IGameCategory,
  cPlusPlus?: IGameCategory,
  javascript?: IGameCategory,
  python?: IGameCategory,
  php?: IGameCategory,
  swift?: IGameCategory,
  objectiveC?: IGameCategory,
  ruby?: IGameCategory,
  go?: IGameCategory,
  sql?: IGameCategory,
  scala?: IGameCategory,
  lisp?: IGameCategory,
  haskell?: IGameCategory,
  perl?: IGameCategory,
  r?: IGameCategory,
  matlab?: IGameCategory,
  scratch?: IGameCategory,
  bash?: IGameCategory
}