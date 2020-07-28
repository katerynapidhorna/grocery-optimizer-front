import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { PRICE_COMPARISON } from "../graphql/queries";
import { cloneObj } from "../utils";

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
      console.log(dataClone);

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

  // function addStore(id, state) {
  //   let totalForStore = 0;
  //   const newProducts = state.products.map((p) => {
  //     const { amount, prices, totals } = p;
  //     const storePrice = prices.find((sp) => {
  //       return sp.storeId === id;
  //     });
  //     let storeTotalForThisProduct;
  //     if (!amount || !storePrice) {
  //       storeTotalForThisProduct = 0;
  //     } else {
  //       storeTotalForThisProduct = storePrice.price * amount;
  //     }
  //     totalForStore += storeTotalForThisProduct;
  //     totals[id] = storeTotalForThisProduct;
  //     return { ...p, totals: totals };
  //   });

  //   const newTotals = { ...state.totals };
  //   newTotals[id] = totalForStore;

  //   const newSelectedStores = state.selectedStores;
  //   newSelectedStores.push(id);

  //   set_state({
  //     ...state,
  //     selectedStores: newSelectedStores,
  //     products: newProducts,
  //     totals: newTotals,
  //   });
  // }

  // function removeStore(id, state) {}

  if (loading || !state) {
    return "...loading";
  }

  if (error) {
    return error.message;
  }

  return (
    <div>
      <h2>Compare prices here</h2>
      <Link to={`/editPage/${listId}`}>edit list</Link>
      <button>+</button>
      <table>
        <thead>
          <tr>
            <td>Product</td>
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
      <pre>
        <code>{JSON.stringify(state, null, "  ")}</code>
      </pre>
    </div>
  );
}

function StoreSelect(props) {
  return (
    <select>
      <option>123</option>
    </select>
  );
}
