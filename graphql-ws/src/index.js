import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { SubscriptionClient } from "subscriptions-transport-ws";
import ApolloClient from "apollo-client";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// Create WebSocket client
const WSClient = new SubscriptionClient(`ws://localhost:4000/api/ws`, {
  reconnect: true,
  connectionParams: {
    // Connection parameters to pass some validations
    // on server side during first handshake
  }
});



const GraphQLClient = new ApolloClient({
  link: WSClient,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={GraphQLClient}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
