import React, { useState, useEffect } from "react";
import { InputGroup } from 'react-bootstrap';
import "./ShoppingList.css";
import { Link, useParams,useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { UPDATE_PURCHASED } from "../../graphql/mutations";
import { GET_SHOPPING_LIST } from "../../graphql/queries";

export default function ShoppingList() {
  const history = useHistory();
  const listId = parseInt(useParams().id);
  const[checkedId,set_checkedId] = useState([])
  const [productsList, set_productsList] = useState(null);
  const { loading, error, data, refetch } = useQuery(GET_SHOPPING_LIST, {
    variables: {
      id: listId,
    },
  });

  const [updatePurchased, { productId, purchased, shoppinglistId }] = useMutation(
    UPDATE_PURCHASED
  );

  useEffect(() => {
    if (data) {
      set_productsList(data.shoppingList);
    }
  }, [data]);

  useEffect(()=>{
    if(error) {
      history.push('/login')
    }
  },[error])



  if (loading) return "Loading...";
  if (error) return error.message;



  return (
    <div className="list-container">
      <div className="list">
        <h2 className='list-title'>{productsList && productsList.title}</h2>
        <button className='reset-button '
          onClick={async()=>{
            if(checkedId.length) {
              await updatePurchased({ variables:{productId:checkedId,purchased:false,shoppinglistId:listId}})
              refetch()
            }
          }}
        >reset checkboxs</button> 
        <ul>
          {productsList &&
            productsList.products.map((p, i) => {
              return (
                <li key={i}>
                  {p.name}
                  <InputGroup.Checkbox checked={p.purchased} onChange={async (e)=>{
                    
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
                      await updatePurchased({ variables:{productId:[p.id],purchased:e.target.checked,shoppinglistId:listId}})
                      refetch()
                  }} />
                </li>
              );
            })}
        </ul>
      </div>
      
      <div className='buttons-conteiner'>
      <div className='controls'>
        <Link className='basic-button edit-button' title='edit list' to={`/editPage/${listId}`}></Link> 
        <span>Edit list</span>
      </div>
      <div className='controls'>
        <Link className='basic-button prices-button' title='enter prices' to={`/enterPrices/${listId}`}></Link>
        <span>Enter prices</span>
      </div>
      <div className='controls'>
       <Link className='basic-button compare-button' title='compare prices' to={`/comparePrices/${listId}`}></Link>
       <span>Compare prices</span>
      </div>
      <div className='controls'>
       <Link className='basic-button home-button' title='home' to={`/`}></Link>
       <span>Home</span>
      </div>
      </div>
    
  
      
      
    </div>
  );
}