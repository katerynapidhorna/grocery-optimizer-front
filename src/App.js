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
import "./App.css";
import Homepage from "./pages/Homepage/Homepage";
import Loginpage from "./pages/Loginpage/Loginpage";
import { Switch, Route } from "react-router-dom";
import { ApolloLink } from "@apollo/client";
import Navigation from "./components/Navigation";
import Editlist from "./components/Editlist/Editlist";
import ShoppingList from "./components/ShoppingList/ShoppingList";
import Signup from "./pages/Signup";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }) => ({
    headers: {
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
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
      <Navigation />
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Loginpage} />
        <Route path="/homepage" component={Homepage} />
        <Route path="/editPage/:id" component={Editlist} />
        <Route path="/shoppingList/:id" component={ShoppingList} />
      </Switch>
    </ApolloProvider>
  );
}

export default App;
