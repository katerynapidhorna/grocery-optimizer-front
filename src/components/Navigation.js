import React,{useState} from 'react'
import { Link } from "react-router-dom";

export default function Navigation() {
const[loggedIn,set_loggedIn] = useState(true)

  return (
    <div className='navigation'>
    <span className='logo'>Grocery Optimizer</span>
    <div className='manu'>
      <div></div>
      <div></div>
      <div></div>
      <ul className='nav-manu'>
        <li><Link to='/'>Home</Link></li>
        {loggedIn ? <li><Link to='/login' onClick={()=>{
          if(localStorage.getItem('jwt')) {
            localStorage.removeItem('jwt')
            set_loggedIn(!loggedIn)
          }
        }}>Logout</Link></li>: null}
        {!loggedIn ? <li><Link to='/login'>Login</Link></li> : null }
      </ul>
    </div>
    </div>
  )
}
