import React from 'react'

export const SignIn = ({onSignInInput, user, submitSignIn}) => {    
  return (
    <>
      <div>Sign in first</div>
      <input type='text' placeholder='Create a username...' value={user?.name} onChange={(e) => onSignInInput(e.target.value)}/>
      <button onClick={submitSignIn}>Send</button>
    </>
    
  )
}

export default SignIn