import React from 'react'
import './Homepage.css'
import {Link} from 'react-router-dom';
import { useQuery } from "@apollo/react-hooks";
import {GET_SOPPING_LISTS}  from '../../graphql/queries'

export default function Homepage() {
  const { loading, error, data } = useQuery(GET_SOPPING_LISTS);
  console.log(data)

  if (loading) return "Loading...";
  if (error)
    return (
      error.message
    );



  return (
    <div>
      <h1>All shopping lists here</h1>
      {data.shoppingLists.map((list)=>{
        return <div key={list.id}>
                <p>{list.title}</p>
              </div>
      })}
    </div>
  )
}
