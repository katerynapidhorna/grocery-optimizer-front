import React, { useState } from "react";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache, HttpLink, ApolloClient, from } from "@apollo/client";
import "./App.css";
import Homepage from "./pages/Homepage/Homepage";
import Loginpage from "./pages/Loginpage/Loginpage";
import { Switch, Route } from "react-router-dom";
import { ApolloLink } from "@apollo/client";
import Navigation from "./components/Navigation";
import Editlist from "./components/Editlist/Editlist";
import ShoppingList from "./components/ShoppingList/ShoppingList";
import EnterPrices from "./components/EnterPrices";
import ComparePrices from "./components/ComparePrices";
import Signup from "./pages/Signup";
import Popup from "./components/Popup";
import { BACKEND_URL } from "./config";

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }) => ({
    headers: {
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
      ...headers,
    },
  }));
  return forward(operation);
});

const l = from([authLink, new HttpLink({ uri: `${BACKEND_URL}/graphql` })]);

const client = new ApolloClient({
  link: l,
  cache: new InMemoryCache(),
});

function App() {
  const [loggedIn, set_loggedIn] = useState(localStorage.getItem("jwt"));
  function setLoginStatus(val) {
    set_loggedIn(val);
  }

  return (
    <ApolloProvider client={client}>
      <Navigation isLoggedIn={loggedIn} setLoginStatus={setLoginStatus} />
      <Popup />
      <Switch>
        <Route exact path="/signup">
          <Signup isLoggedIn={loggedIn} setLoginStatus={setLoginStatus} />
        </Route>
        <Route exact path="/login">
          <Loginpage isLoggedIn={loggedIn} setLoginStatus={setLoginStatus} />
        </Route>
        <Route exact path="/">
          <Homepage isLoggedIn={loggedIn} />
        </Route>
        <Route path="/edit/:id" component={Editlist} />
        <Route path="/shoppingList/:id" component={ShoppingList} />
        <Route path="/enter-prices/:id" component={EnterPrices} />
        <Route path="/comparePrices/:id" component={ComparePrices} />
      </Switch>
    </ApolloProvider>
  );
}

export default App;
