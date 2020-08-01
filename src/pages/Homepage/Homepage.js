import React from "react";
import "./Homepage.css";
import { Link, useHistory } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { GET_USER } from "../../graphql/queries";
import { ADD_SHOPPING_LIST } from "../../graphql/mutations";
import { handleNetworkError } from "../../utils";

export default function Homepage(props) {
  const [addShoppingList] = useMutation(ADD_SHOPPING_LIST);
  const [getUser, { loading, error, data, refetch }] = useLazyQuery(GET_USER);
  const history = useHistory();

  if (!props.isLoggedIn) {
    history.replace("/login");
    return "";
  }

  // Infinite loop without setTimeout
  setTimeout(() => {
    getUser({});
  }, 16);

  if (loading) return "Loading...";
  if (error) {
    handleNetworkError(error, history);
    return error.message;
  }

  return (
    <div className="shoppinglists-container">
      <h1>Your shopping lists</h1>
      {data &&
        data.shoppingLists.map((list) => {
          return (
            <div key={list.id} className="shoppinglist-box">
              <Link to={`/shoppingList/${list.id}`}>{list.title}</Link>
            </div>
          );
        })}
      <div className="shoppinglist-box">
        <Link
          to="#"
          onClick={async (e) => {
            e.preventDefault();
            const res = await addShoppingList({
              variables: { title: "My new List", userId: data.user.id },
            });
            refetch();
            history.push(`/edit/${res.data.addShoppinList.id}`);
          }}
        >
          Create new list
        </Link>
      </div>
    </div>
  );
}
