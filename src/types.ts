interface DB {
  games: Game[];
  authors: Author[];
  reviews: Review[];
}

interface Game {
  id: string;
  title: string;
  platform: string[];
}

interface Author {
  id: string;
  name: string;
  verified: boolean;
}

interface Review {
  id: string;
  rating: number;
  content: string;
  author_id: string;
  game_id: string;
}

export type { DB, Game, Author, Review };
