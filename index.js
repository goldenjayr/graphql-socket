const { Server } = require("http");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { execute, subscribe } = require("graphql");
const cors = require('cors')
const { makeExecutableSchema } = require('graphql-tools')
const GraphqlHTTP = require("express-graphql");
const app = require("express")();
const messages = require('./messages')
// const schema = require("./schema");
const typeDefs = require('./typeDefs')
const resolvers = require("./resolvers");

const schema = makeExecutableSchema({ typeDefs, resolvers })

app.use(cors())

app.use(
  "/api/ql",
  GraphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

// Making plain http server for web socket usage
const server = Server(app);

SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe
  },
  {
    server: server,
    path: "/api/ws"
  }
);



server.listen(4000, () => {
  console.log(`Server is listening to --> http://localhost:4000`);
});
