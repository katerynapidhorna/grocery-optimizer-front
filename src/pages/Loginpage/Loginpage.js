import React, {useState,useEffect} from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import './Loginpage.css'

export default function Loginpage() {
  const[userEmail,set_userEmail] = useState('');
  const[userPassword,set_userPassword] = useState('')


 async function postUserData(email,password) {
   const response  = await axios.post('http://localhost:4000/login', {
     email,
     password
   })
   localStorage.setItem('jwt',response.data.token)
 }

  


  return (
    <div className='form-container'>
      <h2>Login</h2>
      <form action='/homepage'>
        <input type='email' 
               placeholder='email' 
               value={userEmail}
               onChange={(e)=>{
                 set_userEmail(e.target.value)
               }}
        />
        <input type='password' 
               placeholder='password' 
               value={userPassword}
               onChange={(e)=>{
                set_userPassword(e.target.value)
               }}
        />
      <input type='submit' onClick={(e)=>{
        postUserData(userEmail,userPassword)
      }}/>
      </form>
      <Link to='/signup'>create new accaunt</Link>
    </div>
  )
}
