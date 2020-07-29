import React, { useState, useEffect } from "react";
import { InputGroup } from 'react-bootstrap';
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
                  <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                </li>
              );
            })}
        </ul>
      </div>
      
      <div className='buttons-conteiner'>
      <Link className='basic-button edit-button' title='edit list' to={`/editPage/${listId}`}></Link> 
      <Link className='basic-button prices-button' title='enter prices' to={`/enterPrices/${listId}`}></Link>
      <Link className='basic-button compare-button' title='compare prices' to={`/comparePrices/${listId}`}></Link>
      <Link className='basic-button home-button' title='home' to={`/`}></Link>
      </div>
    </div>
  );
}
