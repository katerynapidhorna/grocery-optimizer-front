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
        <button className='reset-button '>reset checkboxs</button> 
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
      
      <div className='buttons-conteiner'>
      <Link className='basic-button'  to={`/editPage/${listId}`}>edit list</Link> 
      <Link className='basic-button' to={`/enterPrices/${listId}`}>enter prices</Link>
      <Link className='basic-button' to={`/comparePrices/${listId}`}>compare stores</Link>
      <Link className='basic-button' to={`/`}>Home</Link>
      </div>
    </div>
  );
}
