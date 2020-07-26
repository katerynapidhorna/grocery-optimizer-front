import React, {useState} from 'react'
import {CREATE_NEW_USER} from '../graphql/mutations';
import { useQuery, useMutation } from "@apollo/react-hooks";

export default function Signup() {
  const[newEmail,set_newEmail] = useState('')
  const[newPassword,set_newPassword] = useState('')
  const [createNewUser, { email,password }] = useMutation(CREATE_NEW_USER);

  return (
    <div className='form-container'>
    <h2>Create new accaunt</h2>
    <form action='/login'>
      <input type='email' 
             placeholder='email' 
             value={newEmail}
             onChange={(e)=>{
              set_newEmail(e.target.value)
             }}
      />
      <input type='password' 
             placeholder='password'
             value={newPassword} 
             onChange={(e)=>{
              set_newPassword(e.target.value)
             }}
      />
    <input type='submit' value='sign up' onClick={()=>{
      createNewUser({variables:{email:newEmail, password:newPassword}})
    }}/>
    </form>
  </div>
  )
}
