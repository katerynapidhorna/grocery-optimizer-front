import React from "react";
import "./Homepage.css";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_USER } from "../../graphql/queries";
import { ADD_SHOPPING_LIST } from "../../graphql/mutations";

export default function Homepage() {
  const [addShoppingList, { title, userId }] = useMutation(ADD_SHOPPING_LIST);
  const { loading, error, data, refetch } = useQuery(GET_USER);
  const history = useHistory();
  const colors = ['rgb(231 90 110)']

  

  if (loading) return "Loading...";
  if (error) return error.message;

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
        <Link to='#'
          onClick={async (e) => {
            e.preventDefault();
            const res = await addShoppingList({
              variables: { title: "My new List", userId: data.user.id },
            });
            refetch()
            history.push(`/edit/${res.data.addShoppinList.id}`);
          }}
        >
          Create new list
        </Link>
      </div>
    </div>
  );
}
