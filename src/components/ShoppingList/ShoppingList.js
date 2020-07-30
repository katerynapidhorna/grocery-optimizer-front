import React, { useState, useEffect } from "react";
import { InputGroup } from 'react-bootstrap';
import "./ShoppingList.css";
import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { UPDATE_PURCHASED } from "../../graphql/mutations";
import { GET_SHOPPING_LIST } from "../../graphql/queries";

export default function ShoppingList() {
  const listId = parseInt(useParams().id);
  const[checkedId,set_checkedId] = useState([])
  const [productsList, set_productsList] = useState(null);
  const { loading, error, data } = useQuery(GET_SHOPPING_LIST, {
    variables: {
      id: listId,
    },
  });

  const [updatePurchased, { productId, purchased }] = useMutation(
    UPDATE_PURCHASED
  );

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
        <h2 className='list-title'>{productsList && productsList.title}</h2>
        <button className='reset-button '
          onClick={async()=>{
            console.log('checkedId',typeof checkedId)
            if(checkedId.length) {
              await updatePurchased({ variables:{productId:checkedId,purchased:false}})
            }
          }}
        >reset checkboxs</button> 
        <ul>
          {productsList &&
            productsList.products.map((p, i) => {
              return (
                <li key={i}>
                  {p.name}
                  <InputGroup.Checkbox  onChange={async (e)=>{
                    
                    if(checkedId.indexOf(p.id) === -1 && e.target.checked) {
                      // if there is no such id => add id
                      set_checkedId([...checkedId,p.id])
                    } else if(checkedId.indexOf(p.id) !== -1 && !e.target.checked) {
                      // if there is such id filter it put
                      set_checkedId(checkedId.filter((id)=>{
                        return id !== p.id
                      }))
                    }
                      // update purchased
                      await updatePurchased({ variables:{productId:[p.id],purchased:e.target.checked}})
                  }} />
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
