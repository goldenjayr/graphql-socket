import React from "react";
import { useSubscription } from "react-apollo";
import gql from "graphql-tag";

import logo from "./logo.svg";
import "./App.css";

const NEW_MESSAGE = gql`
  subscription {
    newMessage
  }
`;

function App() {
  const { data } = useSubscription(NEW_MESSAGE);
  console.log("TCL: App -> data", data);
  return (
    <div className="App">
      <header className="App-header">
        <div>{data && data.newMessage}</div>
      </header>
    </div>
  );
}

export default App;
