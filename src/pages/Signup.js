import React, { useRef } from 'react'
import Header from '../components/Header'
import { createUserWithEmailAndPassword } from "firebase/auth"
import {auth} from "../utils/firebase"
import { doc, setDoc } from "firebase/firestore"; 
import db from "../utils/firebase"
import Login from '../components/Login';

// Signup component
// Contains the sign up page of the web application. This connects to the back
// end by making api calls to firebase to sign up the user with
// firebase authentication. The front end elements
// allow the user to pass in the information needed by firebase.
function Signup() 
{
  // Hold our two useRefs
  const emailRef = useRef();
  const passwordRef = useRef();
  
  // Async function that calls to Firebase to sign up the user
  // using authentication of email and password
  const register = async () => 
  {
    // Try to sign up with email and password
    try 
    {
      // Create the user using email and password
      await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      
      // After creating the user using the credentials make an api call to firestore
      .then(async(cred) => 
      {
        // Create the document for the user, using its credentials 
        await setDoc(doc(db, "users", `${cred.user.uid}`), 
        {
          // Pass in the fields with default values
          USD: 0,
          CHF: 0,
          EUR: 0,
          KYD: 0,
          GIP: 0,
          GBP: 0,
          JOD: 0,
          CNY: 0,
          MXN: 0,
          JPY: 0
        })
        // If there is credentials then navigate the user to the dashboard
        if(cred) 
        {
          window.location = "/dashboard"
        } 
      })   
    } 
    // Else catch the fail sign up and display an alert to the user 
    catch(error) 
    {
      alert(error.message);
    } 
  }
    
  return (
    // Main div for page
    <div>
        {/* Header component for each page */}
        <Header href="/Signup" link="Sign up" headerStatement="Need an account?" />

        {/* Login component for the page */}
        <Login title="Sign up" button="Sign up" btnFunction={register} emailInput={emailRef} passwordInput={passwordRef} />
    </div> 
  )
}

// Export component
export default Signup
