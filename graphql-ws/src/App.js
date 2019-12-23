import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import logo from './logo.svg';
import './App.css';

const HELLO_QUERY = gql`
  query Hello {
    subscription
  }
`

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Query query={HELLO_QUERY}>
          {
            ({loading, error, data}) => {
              if(loading) return <h4>Loading...</h4>
              if(error) console.log(error)

              return <h2>{data.message}</h2>
            }
          }
        </Query>
      </header>
    </div>
  );
}

export default App;
