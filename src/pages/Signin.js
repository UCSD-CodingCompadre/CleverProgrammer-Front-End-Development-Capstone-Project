import React, { useRef } from 'react'
import Header from '../components/Header'
import Login from '../components/Login'
import {auth} from "../utils/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"

// Login component
// Contains the sign in page of the web application. This connects to the back
// end by making api calls to firebase to sign in the user
// using firebase authentication. The front end elements
// allow the user to pass in the information needed by firebase.
function Signin() 
{
  // Hold our two useRefs
  const emailRef = useRef();
  const passwordRef = useRef()
  
  // Async function that calls to Firebase to sign in the user
  // using authentication of email and password
  const login = async () => 
  {
    // Try to sign in with email and password
    try 
    {
      // Sign in the user using email and password
      await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      // After signing in if the user exists then navigate the user to the dashboard
      .then(user => 
        {
          if(user) 
          {
            window.location = "/dashboard"
          } 
        })
    }
    // Else catch the fail logging and display an alert to the user 
    catch(error) 
    {
      alert(error.message)   
    }
  }

  return (
    // Main div for page
    <div>
        {/* Header component for each page */}
        <Header href="/Signup" link="Sign up" headerStatement="Need an account?" />
        
        {/* Login component for the page */}
        <Login title="Sign in" button="Sign in" btnFunction={login} emailInput={emailRef} passwordInput={passwordRef} />
    </div>
  )
}

// Export component
export default Signin
