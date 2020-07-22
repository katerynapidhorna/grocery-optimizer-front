import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import './App.css';
import Homepage from './pages/Homepage/Homepage'
import Loginpage from './pages/Loginpage/Loginpage'
import { Switch, Route} from 'react-router-dom'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});
console.log(client)
function App() {
  return (
    <ApolloProvider client={client}>
      <Switch>
        <Route exact path='/  ' component={Loginpage}/>
        <Route exact path='/homepage' component={Homepage}/>
      </Switch>
    </ApolloProvider>
  );
}

export default App;
