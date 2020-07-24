import React from "react";
import "./Homepage.css";
import { Link, Redirect } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_USER } from "../../graphql/queries";
import {ADD_SHOPPING_LIST} from '../../graphql/mutations';

export default function Homepage() {
  const [addShoppingList, { title,userId }] = useMutation(ADD_SHOPPING_LIST);
  const { loading, error, data } = useQuery(GET_USER);
  console.log("data", data);

  if (loading) return "Loading...";
  if (error) return error.message;

  console.log(data.shoppingLists)

  return (
    <div className='list-container'>
      {data && data.shoppingLists.map((list)=>{
        return <div key={list.id} className='shoppinglist-box'><Link to='#'>{list.title}</Link></div>
      })}
      <div className='shoppinglist-box'><Link to='/editPage' onClick={()=>{
        addShoppingList({variables:{title:"My new List", userId:17}})
      }}>Create new list</Link></div>
    </div>
  );
}
