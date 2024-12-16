import fs from 'fs';
import path from 'path';
import { Author, DB, Game, Review } from './types';

const DB_FILE = path.join(process.cwd(), 'db.json');

function loadData(): DB {
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
}

function saveData(data: DB) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

const db = {
  get games() {
    return loadData().games;
  },
  get authors() {
    return loadData().authors;
  },
  get reviews() {
    return loadData().reviews;
  },
  saveGames(games: Game[]) {
    const data = loadData();
    data.games = games;
    saveData(data);
  },
  saveAuthors(authors: Author[]) {
    const data = loadData();
    data.authors = authors;
    saveData(data);
  },
  saveReviews(reviews: Review[]) {
    const data = loadData();
    data.reviews = reviews;
    saveData(data);
  },
  saveAll({ games, authors, reviews }: DB) {
    saveData({ games, authors, reviews });
  },
};

export default db;
