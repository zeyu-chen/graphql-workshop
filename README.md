# GraphQL Games API

A simple GraphQL API for managing video games, reviews, and authors built with Apollo Server and TypeScript.

## Features

- Query games, authors, and reviews
- Create, update, and delete games
- Relational data between games, reviews, and authors
- File-based JSON database

## Tech Stack

- TypeScript
- Apollo Server
- GraphQL
- Node.js

## Getting Started

1. Clone the repository
2. Install dependencies:

```shell
npm install
```

3. Start the development server:

```shell
npm run dev
```

4. Open GraphQL Playground at `http://localhost:4000`

## Available Queries

```graphql
# Get all games
query Games {
  games {
    id
    title
    platform
    reviews {
      rating
      content
    }
  }
}

# Get single game
query Game($id: ID!) {
  game(id: $id) {
    title
    platform
  }
}

# Get all authors
query Authors {
  authors {
    id
    name
    verified
    reviews {
      rating
      content
    }
  }
}

# Get single author
query Author($id: ID!) {
  author(id: $id) {
    name
    verified
    reviews {
      rating
      content
      game {
        title
      }
    }
  }
}

# Get all reviews
query Reviews {
  reviews {
    id
    rating
    content
    author {
      name
    }
    game {
      title
    }
  }
}

# Get single review
query Review($id: ID!) {
  review(id: $id) {
    rating
    content
    author {
      name
    }
    game {
      title
    }
  }
}
```

## Available Mutations

```graphql
# Add new game
mutation AddGame($title: String!, $platform: [String!]!) {
  addGame(title: $title, platform: $platform) {
    id
    title
  }
}

# Delete game
mutation DeleteGame($id: ID!) {
  deleteGame(id: $id) {
    id
    title
  }
}

# Update game
mutation UpdateGame($id: ID!, $title: String, $platform: [String!]) {
  updateGame(id: $id, title: $title, platform: $platform) {
    id
    title
    platform
  }
}
```

## Project Structure

- `/src` - Source code
  - `schema.ts` - GraphQL type definitions
  - `resolvers.ts` - Query and mutation resolvers
  - `db.ts` - Database operations
  - `types.ts` - TypeScript interfaces

## License

ISC
