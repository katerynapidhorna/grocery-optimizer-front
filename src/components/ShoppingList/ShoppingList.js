import React, { useState, useEffect } from "react";
import "./ShoppingList.css";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_SHOPPING_LIST } from "../../graphql/queries";

export default function ShoppingList() {
  const listId = parseInt(useParams().id);
  const [productsList, set_productsList] = useState(null);
  const { loading, error, data } = useQuery(GET_SHOPPING_LIST, {
    variables: {
      id: listId,
    },
  });

  useEffect(() => {
    if (data) {
      set_productsList(data.shoppingList);
    }
  }, [data]);

  if (loading) return "Loading...";
  if (error) return error.message;

  return (
    <div className="list-container">
      <div className="list">
        <h2>{productsList && productsList.title}</h2>
        <ul>
          {productsList &&
            productsList.products.map((p, i) => {
              return (
                <li key={i}>
                  {p.name}
                  <input type="checkbox" />
                </li>
              );
            })}
        </ul>
      </div>
      <button>
        <Link to={`/editPage/${listId}`}>edit list</Link>
      </button>
      <button>reset checkboxs</button>
      <button>enter prices</button>
      <button>compare stores</button>
    </div>
  );
}
