import React from "react";
import { ApolloProvider } from "react-apollo";
import {
  createHttpLink,
  InMemoryCache,
  HttpLink,
  ApolloClient,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// import ApolloClient, { from } from "apollo-boost";
import "./App.css";
import Homepage from "./pages/Homepage/Homepage";
import Loginpage from "./pages/Loginpage/Loginpage";
import { Switch, Route } from "react-router-dom";
import { ApolloLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem("token");
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

const authLink = new ApolloLink((operation, forward) => {
  console.log(213123123);
  operation.setContext(({ headers }) => ({
    headers: {
      authorization: "ppp",
      ...headers,
    },
  }));
  return forward(operation);
});

const l = from([
  authLink,
  new HttpLink({ uri: "http://localhost:4000/graphql" }),
]);

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  link: l,
  cache: new InMemoryCache(),
});

console.log(client);
function App() {
  return (
    <ApolloProvider client={client}>
      <Switch>
        <Route exact path="/" component={Loginpage} />
        <Route path="/homepage" component={Homepage} />
      </Switch>
    </ApolloProvider>
  );
}

export default App;
