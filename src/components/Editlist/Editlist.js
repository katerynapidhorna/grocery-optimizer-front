import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";

import "./Editlist.css";
import { GET_SHOPPING_LIST } from "../../graphql/queries";
import { UPDATE_SHOPPING_LIST } from "../../graphql/mutations";
import { cloneObj } from "../../utils";

export default function Editlist() {
  const listId = parseInt(useParams().id);
  const [productsList, set_productsList] = useState(null);
  const [updateShoppingList, { list, products }] = useMutation(
    UPDATE_SHOPPING_LIST
  );
  const { loading, error, data, refetch } = useQuery(GET_SHOPPING_LIST, {
    variables: {
      id: listId,
    },
  });

  useEffect(() => {
    if (data) {
      set_productsList(cloneObj(data.shoppingList));
    }
  }, [data]);

  if (loading) return "Loading...";
  if (error) return error.message;

  function removeOne(index) {
    return productsList.products.filter((p, i) => {
      if (i !== index) {
        return p;
      }
    });
  }

  return (
    <div className="list-container">
      <form className="edit-list-form">
        {productsList && (
          <input
            className="title-input"
            type="text"
            value={productsList.title}
            onChange={(e) => {
              set_productsList({ ...productsList, title: e.target.value });
            }}
          />
        )}
        {productsList &&
          productsList.products.map((product, i) => {
            return (
              <div key={i} className="input-container">
                <input
                  className="product-input"
                  type="text"
                  placeholder="product name"
                  value={product.name}
                  onChange={(e) => {
                    const newArray = productsList.products.map((p, index) => {
                      if (index === i) {
                        p.name = e.target.value;
                      }
                      return p;
                    });
                    set_productsList({ ...productsList, products: newArray });
                  }}
                />
                <input
                  className="amount-input"
                  type="number"
                  placeholder="quontity"
                  min="0"
                  value={product.amount}
                  onChange={(e) => {
                    const newArray = productsList.products.map((p, index) => {
                      if (index === i) {
                        p.amount = parseInt(e.target.value) || 0;
                      }
                      return p;
                    });
                    set_productsList({ ...productsList, products: newArray });
                  }}
                />
                <span
                  className="remove-item"
                  onClick={(e) => {
                    e.preventDefault();
                    set_productsList({
                      ...productsList,
                      products: removeOne(i),
                    });
                  }}
                ></span>
              </div>
            );
          })}
        <div className="input-container">
          {productsList && (
            <span
              className="add-item"
              onClick={(e) => {
                e.preventDefault();
                set_productsList({
                  ...productsList,
                  products: [
                    ...productsList.products,
                    { name: "new product", amount: 1, unit: null },
                  ],
                });
              }}
            ></span>
          )}
        </div>
      </form>
      <div className="buttons-conteiner">
        <div className="controls">
          <Link
            className="basic-button list-button"
            title="to current shopping list"
            to={`/shoppingList/${listId}`}
          />
          <span>Back to list</span>
        </div>
        <div className="controls">
          <p
            title="update list"
            className="basic-button update-button"
            onClick={async (e) => {
              e.preventDefault();
              await updateShoppingList({
                variables: {
                  title: productsList.title,
                  id: listId,
                  products: productsList.products.map((p) => {
                    return {
                      name: p.name,
                      amount: p.amount,
                      id: p.id || null,
                    };
                  }),
                },
              });
              refetch();
            }}
          ></p>
          <span>Update list</span>
        </div>
        <div className="controls">
          <Link
            className="basic-button compare-button"
            title="compare prices"
            to={`/comparePrices/${listId}`}
          />
          <span>Compare prices</span>
        </div>
        <div className="controls">
          <Link className="basic-button home-button" title="home" to={`/`} />
          <span>Home</span>
        </div>
      </div>
    </div>
  );
}
