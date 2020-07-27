import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";

import "./Editlist.css";
import { GET_USER } from "../../graphql/queries";
import { cloneObj } from "../../utils";

export default function Editlist() {
  const listId = parseInt(useParams().id);
  const [productsList, set_productsList] = useState(null);
  const [newProducts, set_newProducts] = useState(null);
  const { loading, error, data } = useQuery(GET_USER);

  // const [updateList, { a, p }] = useMutation(`

  // `);

  useEffect(() => {
    if (data) {
      const result = data.shoppingLists.find((list) => {
        return list.id === listId;
      });
      // have to clone, otherwise can't mutate object properties later
      set_productsList({
        title: result.title,
        products: cloneObj(result.products),
      });
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
    <div className="edit-container">
      <form>
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
                  className="ptoduct-input"
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
                <button
                  className="remove-item"
                  onClick={(e) => {
                    e.preventDefault();
                    set_productsList({
                      ...productsList,
                      products: removeOne(i),
                    });
                  }}
                >
                  <span>&#10005;</span>
                </button>
              </div>
            );
          })}
        <div className="input-container">
          {productsList && (
            <button
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
            >
              <span>&#43;</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
