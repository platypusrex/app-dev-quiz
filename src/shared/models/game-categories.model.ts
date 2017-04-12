export interface IGameCategory {
  type?: string;
  displayName?: string;
  icon?: string;
  color?: string;
}

export interface IGameCategories {
  java?: IGameCategory,
  cSharp?: IGameCategory,
  c?: IGameCategory,
  cPlusPlus?: IGameCategory,
  javascript?: IGameCategory,
  python?: IGameCategory,
  php?: IGameCategory,
  elixir?: IGameCategory,
  objectiveC?: IGameCategory,
  ruby?: IGameCategory,
  go?: IGameCategory,
  sql?: IGameCategory,
  scala?: IGameCategory,
  elm?: IGameCategory,
  haskell?: IGameCategory,
  perl?: IGameCategory,
  erlang?: IGameCategory,
  clojure?: IGameCategory,
  css?: IGameCategory,
  html?: IGameCategory
}