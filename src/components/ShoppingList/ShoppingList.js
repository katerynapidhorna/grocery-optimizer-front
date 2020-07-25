import React from 'react'
import './ShoppingList.css'

export default function ShoppingList() {
  return (
    <div className='list-container'>
      <div className='list'>
        <ul>
          <li>item
            <input type='checkbox' />
          </li>
          <li>item
          <input type='checkbox' />
          </li>
          <li>item
          <input type='checkbox' />
          </li>
          <li>item
          <input type='checkbox' />
          </li>

        </ul>
      </div>
      <button>edit list</button>
      <button>reset checkboxs</button>
      <button>enter prices</button>
      <button>compare stores</button>
    </div>
  )
}
