import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { PRICE_COMPARISON } from "../graphql/queries";
import { cloneObj } from "../utils";
import "./ComparePrices.css";

export default function ComparePrices() {
  const listId = parseInt(useParams().id);
  const [state, set_state] = useState(null);
  const { loading, error, data } = useQuery(PRICE_COMPARISON, {
    variables: {
      id: listId,
    },
  });

  useEffect(() => {
    if (data) {
      const dataClone = cloneObj(data);

      let globalTotals = {};

      // add totals to every product
      const productsWithTotals = dataClone.shoppingList.products.map((p) => {
        return {
          ...p,
          totals: {},
        };
      });

      // fill totals
      dataClone.stores.forEach((store) => {
        const { id } = store;
        let storeTotal = 0;

        // will modify product's total in this loop
        productsWithTotals.forEach((p) => {
          const { amount, prices } = p;
          const storePrice = prices.find((sp) => {
            return sp.storeId === id;
          });
          let storeTotalForThisProduct;
          if (!amount || !storePrice) {
            storeTotalForThisProduct = 0;
          } else {
            storeTotalForThisProduct = storePrice.price * amount;
          }
          storeTotal += storeTotalForThisProduct;
          p.totals[id] = storeTotalForThisProduct;
        });
        globalTotals[id] = storeTotal;
      });

      // sort stores. Store with lesser total comes first
      dataClone.stores.sort((s1, s2) => {
        const total1 = globalTotals[s1.id];
        const total2 = globalTotals[s2.id];
        return total1 - total2;
      });

      set_state({
        stores: dataClone.stores,
        products: productsWithTotals,
        totals: globalTotals,
      });
    }
  }, [data]);

  if (loading || !state) {
    return "...loading";
  }

  if (error) {
    return error.message;
  }

  return (
    <div className="list-container">
      <h2 className="compare-prices-title">Prices comparison</h2>
      <table className="prices-table" cellSpacing="0">
        <thead>
          <tr>
            <td></td>
            {state.stores.map((s) => {
              return (
                <td key={s.id}>
                  <strong>{s.name}</strong>
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {state.products.map((p) => {
            return (
              <tr key={p.id}>
                <td>{p.name}</td>
                {state.stores.map((s) => {
                  return <td key={s.id}>{p.totals[s.id]}</td>;
                })}
              </tr>
            );
          })}
          <tr>
            <td>
              <strong>TOTAL:</strong>
            </td>
            {state.stores.map((s) => {
              return <td key={s.id}>{state.totals[s.id]}</td>;
            })}
          </tr>
        </tbody>
      </table>
      <div className="buttons-conteiner">
        <div className="controls">
          <Link
            className="basic-button edit-button"
            title="edit list"
            to={`/edit/${listId}`}
          ></Link>
          <span>Edit list</span>
        </div>
        <div className="controls">
          <Link
            className="basic-button prices-button"
            title="enter prices"
            to={`/enterPrices/${listId}`}
          ></Link>
          <span>Enter prices</span>
        </div>
        <div className="controls">
          <Link className="basic-button home-button" title="home" to={`/`} />
          <span>Home</span>
        </div>
      </div>
    </div>
  );
}
