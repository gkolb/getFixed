import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, browserHistory } from 'react-router-dom';
import App from './components/app.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';


// APOLLO SERVER CONNECTION - create a link that connects the Apollo Client to graphQL server
const httpLink = new HttpLink({ uri: '/graphql' });

// Instantiate ApolloClient
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache() // store for state management
});

ReactDOM.render(
  <BrowserRouter>
  <MuiThemeProvider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </MuiThemeProvider>
  </BrowserRouter>, document.getElementById('app'));