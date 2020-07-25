import React from 'react'

export default function Signup() {
  return (
    <div className='form-container'>
    <h2>Create new accaunt</h2>
    <form>
      <input type='text' 
             placeholder='email' 
      />
      <input type='text' 
             placeholder='password' 
      />
    <input type='submit' value='sign up'/>
    </form>
  </div>
  )
}
