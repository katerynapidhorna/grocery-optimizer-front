import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { PRICE_INPUT } from "../graphql/queries";
import { UPDATE_PRICES } from "../graphql/mutations";

export default function EnterPrices() {
  const listId = parseInt(useParams().id);
  const [productsList, set_productsList] = useState();
  const [stores, set_stores] = useState([]);
  const [productsForm, set_productsForm] = useState([]);
  const { loading, error, data, refetch: refetchPricesInput } = useQuery(
    PRICE_INPUT,
    {
      variables: {
        id: listId,
      },
    }
  );
  const [selectedStoreId, set_selectedStoreId] = useState("");
  const [updatePrices, pricesUpdateStatus] = useMutation(UPDATE_PRICES);

  useEffect(() => {
    if (selectedStoreId && productsList) {
      const productsFormData = productsList.products.map((p) => {
        const storePrice = p.prices.find((storePrice) => {
          return storePrice.storeId.toString() === selectedStoreId;
        });
        let knownStorePrice = "";
        if (storePrice) {
          knownStorePrice = storePrice.price.toString();
        }
        return {
          id: p.id,
          name: p.name,
          newPrice: knownStorePrice,
        };
      });
      set_productsForm(productsFormData);
    }
  }, [selectedStoreId, productsList]);

  useEffect(() => {
    if (data) {
      set_productsList(data.shoppingList);
      set_stores(data.stores);
      if (!selectedStoreId) {
        set_selectedStoreId(data.stores[0].id.toString());
      }
    }
  }, [data]);

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return error.message;
  }

  return (
    <div>
      <h1>Enter prices here</h1>

      <div>
        {productsForm.map((p, index) => {
          return (
            <div key={p.id}>
              <span>{p.name}</span>
              <input
                type="number"
                value={p.newPrice}
                onChange={(e) => {
                  set_productsForm(
                    productsForm.map((p, i) => {
                      if (i === index) {
                        return { ...p, newPrice: e.target.value };
                      } else {
                        return p;
                      }
                    })
                  );
                }}
              />
            </div>
          );
        })}
      </div>
      <button
        onClick={async (e) => {
          e.preventDefault();
          await updatePrices({
            variables: {
              prices: productsForm.map((p) => {
                return {
                  productId: p.id,
                  storeId: parseInt(selectedStoreId),
                  productPrice: parseInt(p.newPrice),
                };
              }),
            },
          });
          refetchPricesInput();
        }}
      >
        update
      </button>

      <select
        name="store"
        value={selectedStoreId}
        onChange={(e) => {
          set_selectedStoreId(e.target.value);
        }}
      >
        {stores.map((s) => {
          return (
            <option value={s.id} key={s.id}>
              {s.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
