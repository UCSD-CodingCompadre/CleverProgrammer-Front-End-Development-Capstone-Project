// Import necessary elements
import React, { useRef } from 'react'
import Header from '../components/Header'
import { auth } from "../utils/firebase"
import { signOut } from "firebase/auth"
import '../styles/Deposit.css'
import { doc, updateDoc, getDoc } from "firebase/firestore";
import db from "../utils/firebase"

// Deposit Component
// Contains the html that creates the layout of what the user
// sees when they are going to deposit. It also contains
// Javascript functionality that connects the backend which is 
// Firebase, moreover the users authenticated Firestore. In addition
// we use Javascript to create a function that will handle the whole
// deposit action according to our flow diagram then redirects the user
// back to the dashboard component.
function Deposit() 
{

    // Holds our two useRefs 
    const depositRef = useRef();
    const currencyRef = useRef();
    
    // Async function that calls to Firebase to sign out the
    // user in the backend and redirect them to the
    // login page in the frontend
    const logout = async () => 
    {
        await signOut(auth)
        window.location = "/"
    }

    // Async function that calls to Firebase and retrieves 
    // the authenticated user's Firestore and handles the deposit
    // logic in the backend, moreover it also redirects the user back
    // to the dashboard so the user can see the update in the frontend
    const handleDesposit = async () => 
    {
        // Check if the user doesn't update there useRefs from empty values
        if(currencyRef.current.value === "" || depositRef.current.value === "")
        {
            alert("Make sure to enter a deposit amount and select a currency");
            return;
        }

        // Hold a reference to the user's document in the Firestore
        const docRef = doc(db, "users",`${auth.currentUser.uid}`);
        // Wait and hold the user's document from its reference
        const docSnap = await getDoc(docRef);
        // Hold the data that inside the firestore in 'low-level' Javascript
        const data = docSnap.data();
        // Hold the current values of the useRefs
        const depositAmt = depositRef.current.value;
        const currency = currencyRef.current.value
        
        // Update the users Firestore document with the deposit logic
        await updateDoc(docRef, 
        {
            [currency]: (parseFloat(data[currency]) + parseFloat(depositAmt)).toFixed(2)
        });
        
        // Redirect the user to the dashboard
        window.location= "/dashboard"  
    }
      
    return (
        // Main div for page
        <div id="deposit">
            {/* Header component for each page */}
            <Header logoutLink={logout} secondHref="/dashboard" secondLink="Dashboard" link="Logout" />
            
            <div id="deposit-container">
                <div id="deposit-container-two">
                    <h1>Deposit</h1>
                    {/* Explain useRef vs useState */}
                    <input ref={depositRef} id="deposit-wallet" type="number" placeholder="Enter deposit amount" min={0} />
                    {/* Holds the select element that allows the user to pick the currency */}
                    <select ref={currencyRef} id="deposit-selectCurrency">
                        {/* All the possible values of currency */}
                        <option value="" disabled selected hidden>Please select a currency</option>
                        <option value="USD">US Dollar</option>
                        <option value="CHF">Swiss Franc</option>
                        <option value="EUR">European Euro</option>
                        <option value="KYD">Cayman Islands Dollar</option>
                        <option value="GIP">Gibraltar Pound</option>
                        <option value="GBP">Pound Sterling</option>
                        <option value="JOD">Jordanian Dinar</option>
                        <option value="CNY">Chinese Yuan</option>
                        <option value="MXN">Mexican Peso</option>
                        <option value="JPY">Japanese Yen</option>
                    </select>

                    {/* Button that handles the deposit */}
                    <button onClick={handleDesposit} id="deposit-button">Submit</button>
                </div>
            </div>
        </div>
    )
}

// Export component
export default Deposit
