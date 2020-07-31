import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { PRICE_INPUT } from "../graphql/queries";
import { UPDATE_PRICES } from "../graphql/mutations";
import "./EnterPrices.css";
import { showPopup } from "./Popup";

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
  const [updatePrices] = useMutation(UPDATE_PRICES);

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
  }, [data, selectedStoreId]);

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return error.message;
  }

  return (
    <div className="list-container">
      <h1 className="enter-prices-title">
        Enter
        <select
          className="select-store"
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
        prices
      </h1>

      <div className="price-inputs">
        <form className="price-inputs-form">
          {productsForm.map((p, index) => {
            return (
              <div className="input-box" key={p.id}>
                <input
                  className="input-price"
                  type="number"
                  min="1"
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
                <span className="product">{p.name}</span>
              </div>
            );
          })}
          <div className="complete-button-wrp">
            <button
              className="complete-button"
              onClick={async (e) => {
                e.preventDefault();
                const res = await updatePrices({
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
                // show success message
                if (res) {
                  showPopup("success", "Prices are updated");
                }

                refetchPricesInput();
              }}
            >
              Complete
            </button>
          </div>
        </form>
      </div>
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
