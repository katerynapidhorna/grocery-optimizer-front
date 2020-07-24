import React,{useState} from 'react';
import { useQuery } from "@apollo/react-hooks";

import './Editlist.css';
import {  GET_USER } from "../../graphql/queries";


export default function Editlist() {
  const[productAmount,set_productAmount] = useState([{}])
  const { loading, error, data } = useQuery(GET_USER);

  function removeOne(index) {
    return productAmount.filter((p,i)=>{
      if(i !== index) {
        return p
      }
    })
  }

console.log(data)

  return (
    <div className='edit-container'>
      <form>
        <input className='title-input' type='text' placeholder='new title'/>
        {productAmount && productAmount.map((product,i)=>{
          return <div key={Math.random(new Date())} className='input-container'>
          <input className='ptoduct-input' type='text' placeholder='product name'/>
          <input className='amount-input' type='number' placeholder='quontity'/>
          <button className='remove-item'  onClick={(e)=>{
            e.preventDefault()
            set_productAmount(removeOne(i))
          }}>
            <span>&#10005;</span>
          </button>
        </div>
        })}
        <div className='input-container'>
          <button className='add-item' onClick={(e)=>{
            e.preventDefault()
            set_productAmount([...productAmount,{}])
          }}>
            <span>&#43;</span>
          </button>
        </div>

      </form>
    </div>
  )
}
