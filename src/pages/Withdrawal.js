import React from 'react'
import Header from '../components/Header'
import { auth } from "../utils/firebase"
import { signOut } from "firebase/auth"
import '../styles/Withdrawl.css'
import { useState, useEffect, useRef } from 'react'
import db from "../utils/firebase"
import { doc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";

// Withdrawal Component
// Contains the html that creates the layout of what the user
// sees when they are going to withdrawal. It also contains
// Javascript functionality that connects the backend which is 
// Firebase, moveover the users authenticated Firestore. In addition
// we use Javascript to create a function that will handle the whole
// withdrawal action according to our flow diargram then redirects the user
// back to the dashboard component.
function Withdrawal() 
{
    // Hold our useStates and useRefs
    const withdrawalRef = useRef();
    const currencyRef = useRef();
    const [user, setUser] = useState({})
    const [wallet, setWallet] = useState([])
    // Hold the keys of the Firestore data object
    let keys;

    // Hold an object with the currency names
    const currenyNames = 
    {
        USD: "US Dollar",
        CHF: "Swiss Franc",
        EUR: "European Euro",
        KYD: "Cayman Islands Dollar",
        GIP: "Gibraltar Pound",
        GBP: "Pound Sterling",
        JOD: "Jordanian Dinar",
        CNY: "Chinese Yuan",
        MXN: "Mexican Peso",
        JPY: "Japenese Yen"
    }

    // Async function that calls to Firebase to sign out the
    // user in the backend and redirect them to the
    // login page in the frontend
    const logout = async () => 
    {
        await signOut(auth)
        window.location = "/"
    }
          
    // useEffect rerenders the page when there is a change in the user
    useEffect(()=> 
    {
        // Set the user in the useState when the authentication state has changed
        auth.onAuthStateChanged((currentUser) => 
        {
            setUser(currentUser.uid);
        })
        
        // Set the wallet using the data from Firestore
        onSnapshot(doc(db, "users", `${user}`), (snap) => 
        {
            setWallet(snap.data());
        })
    }, [user])

   
    wallet ? keys = Object.entries(wallet) : console.log("Loading")

    // Async function that calls to Firebase and retrieves 
    // the authenticated user's Firestore and handles the deposit
    // logic in the backend, moreover it also redirects the user back
    // to the dashboard so the user can see the update in the frontend
    const handleWithdrawal = async () => 
    {
        // Check if the user doesn't update ther useRefs from empty values
        if(currencyRef.current.value === "" || withdrawalRef.current.value === "")
        {
            alert("Make sure to enter a withdrawal amount and select a currency");
            return;
        }

        // Hold a refrence to the user's document in the Firestore
        const docRef = doc(db, "users",`${auth.currentUser.uid}`);
        // Wait and hold the user's document from its reference
        const docSnap = await getDoc(docRef);
        // Hold the data that inside the firestore in 'low-level' Javascript
        const data = docSnap.data();
        // Hold the current values of the useRefs
        const withdrawalAmt = withdrawalRef.current.value;
        const currency = currencyRef.current.value
        
        // Check if the withdrawal amount is valid
        if(withdrawalAmt > data[currency])
        {
            alert("Invalid withdrawal amount")
            return;
        }

        // Update the users Firestore document with the deposit logic
        await updateDoc(docRef, 
        {
            [currency]: (parseFloat(data[currency]) - parseFloat(withdrawalAmt)).toFixed(2)
        });
        
        // Redirect the user to the dashboard
        window.location= "/dashboard"  
    }
    return (
        // Main div for page
        <div id="withdrawl">
            <Header logoutLink={logout} secondHref="/dashboard" secondLink="Dashboard" link="Logout" />
            
            <div id="withdrawl-container">
                <div id="withdrawl-container-two">
                    <h1>Withdrawal</h1>
                    <input ref={withdrawalRef} id="withdrawl-wallet" type="text" placeholder="Enter withdrawl amount" min={0} />
                    {/* Holds the select element that allows the user to pick the currency */}
                    <select ref={currencyRef} id="withdrawl-selectCurrency">
                    {keys && keys.map((item) => 
                        {
                            // Check if the user has balance for that currency or else they cannot deposit
                            if(item[1] !== 0)
                            {
                                return <option value={item[0]}>{currenyNames[item[0]]}</option>
                            }
                            return null;
                        })
                    }
                    </select>

                    {/* Button that handles the withdrawal */}
                    <button onClick={handleWithdrawal} id="withdrawl-button">Submit</button>
                </div>
            </div>
        </div>
    )
}

// Export component
export default Withdrawal
