import db from './db';
import { Author, Game, Review } from './types';

export const resolvers = {
  Game: {
    reviews(parent: Game) {
      return db.reviews.filter((r) => r.game_id === parent.id);
    },
  },
  Review: {
    author(parent: Review) {
      return db.authors.find((a) => a.id === parent.author_id);
    },
    game(parent: Review) {
      return db.games.find((g) => g.id === parent.game_id);
    },
  },
  Author: {
    reviews(parent: Author) {
      return db.reviews.filter((r) => r.author_id === parent.id);
    },
  },
  Query: {
    games() {
      return db.games;
    },
    game(_parent: unknown, args: { id: string }) {
      return db.games.find((game) => game.id === args.id);
    },
    authors() {
      return db.authors;
    },
    author(_parent: unknown, args: { id: string }) {
      return db.authors.find((author) => author.id === args.id);
    },
    reviews() {
      return db.reviews;
    },
    review(_parent: unknown, args: { id: string }) {
      return db.reviews.find((review) => review.id === args.id);
    },
  },
  Mutation: {
    addGame(_parent: unknown, args: { title: string; platform: string[] }) {
      const game: Game = {
        id: Math.floor(Math.random() * 10000).toString(),
        title: args.title,
        platform: args.platform,
      };
      const games = [...db.games, game];
      db.saveGames(games);
      return game;
    },
    deleteGame(_parent: unknown, args: { id: string }) {
      const game = db.games.find((g) => g.id === args.id);
      if (!game) throw new Error('Game not found');

      const games = db.games.filter((g) => g.id !== args.id);
      db.saveGames(games);
      return game;
    },
    updateGame(
      _parent: unknown,
      args: { id: string; title?: string; platform?: string[] }
    ) {
      const game = db.games.find((g) => g.id === args.id);
      if (!game) throw new Error('Game not found');

      if (args.title) game.title = args.title;
      if (args.platform) game.platform = args.platform;

      const updatedGames = db.games.map((g) => (g.id === args.id ? game : g));
      db.saveGames(updatedGames);
      return game;
    },
  },
};
