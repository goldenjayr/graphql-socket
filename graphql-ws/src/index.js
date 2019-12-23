import React from "react";
import ReactDOM from "react-dom";
import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { SubscriptionClient } from "subscriptions-transport-ws";
import ApolloClient from "apollo-client";
import { getMainDefinition } from 'apollo-utilities';


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

// Create an http link:
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/api/ql'
});


// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  WSClient,
  httpLink,
);

const GraphQLClient = new ApolloClient({
  link: link,
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
