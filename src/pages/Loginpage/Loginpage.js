import React, {useState} from 'react'
import './Loginpage.css'

export default function Loginpage() {
  const[email,set_email] = useState('');
  const[password,set_password] = useState('')


 

  return (
    <div className='form-container'>
      <h2>Login</h2>
      <form>
        <input type='text' 
               placeholder='email' 
               value={email}
               onChange={(e)=>{
                 set_email(e.target.value)
                 console.log(email)
               }}
        />
        <input type='text' 
               placeholder='password' 
               value={password}
               onChange={(e)=>{
                 set_password(e.target.value)
                 console.log(password)
               }}
        />
      <input type='submit' />
      </form>
    </div>
  )
}
