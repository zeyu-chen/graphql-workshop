import express from 'express';
import { buildSchema } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';
import expressPlayground from 'graphql-playground-middleware-express';
import routes from './src/routes/crmRoutes';

// Build my schema
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provide resolve function
const root = {
  hello: () => {
    return 'Hello world!';
  },
};

const app = express();
const PORT = 3000;

// serving static files
app.use(express.static('public'));

routes(app);

// Setup GraphQL endpoint
app.use(
  '/graphql',
  createHandler({
    schema: schema,
    rootValue: root,
  })
);

app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

app.listen(PORT, () =>
  console.log(`Your server is running on port ${PORT}/graphql`)
);
