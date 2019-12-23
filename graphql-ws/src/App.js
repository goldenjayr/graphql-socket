import React from "react";
import { useSubscription, Query } from "react-apollo";
import gql from "graphql-tag";

import logo from "./logo.svg";
import "./App.css";

const NEW_MESSAGE = gql`
  subscription {
    newMessage
  }
`;

const MESSAGES = gql`
  query {
    messages
  }
`

function App() {
  const { data } = useSubscription(NEW_MESSAGE);
  console.log("TCL: App -> data", data);
  return (
    <div className="App">
      <header className="App-header">
        <div>Subscription: {data && data.newMessage}</div>
        <Query query={MESSAGES}>
          {
            ({loading, error, data}) => {
              if(loading) return <h4>Loading...</h4>
              if(error) console.log(error)
              return <div>Query: {data && data.messages.map(message => {
                return <div key={message}>{message}</div>
              })}</div>
            }
          }
        </Query>
      </header>
    </div>
  );
}

export default App;
