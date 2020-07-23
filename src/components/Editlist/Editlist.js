import React,{useState} from 'react'
import './Editlist.css'

export default function Editlist() {
  const[productAmount,set_productAmount] = useState([{}])

  function removeOne(index) {
    return productAmount.filter((p,i)=>{
      if(i !== index) {
        return p
      }
    })
  }

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
