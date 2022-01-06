import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import {auth} from "../utils/firebase"
import db from "../utils/firebase"
import {signOut} from "firebase/auth"
import '../styles/Dashboard.css'
import Currency from '../components/Currency'
import { Link } from 'react-router-dom'
import { doc, onSnapshot } from "firebase/firestore"

// Dashboard component
// Contains the dashboard page of the web application this connects
// to the back end by retrieve the users Firestore doc and displaying the
// data in the front end so the user can see what is inside their wallet.
function Dashboard() 
{
    // Async function that calls to Firebase to sign out the
    // user in the backend and redirect them to the
    // login page in the frontend 
    const logout = async () => 
    {
        await signOut(auth)
        window.location = "/"
    }
    
    // Hold our two useStates
    const [user, setUser] = useState({})
    const [wallet, setWallet] = useState([])
  
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
    
    // Hold the keys from the data object
    let keys;
   
    // Update the keys using the object passed
    wallet ? keys = Object.entries(wallet) : console.log("Loading")
     
    return (
        // Main div for page
        <div id="dashboard">
            {/* Header component for each page */}
            <Header logoutLink={logout} link="Logout" />
            <div id="dashboard-main">
                <div id="dashboard-container">
                    <ul>
                    {/* Map through our array that contains the Firestore data */}
                    { keys && keys.map((item) => 
                        {
                            // Only create a currency component if the user has money for that currency
                            if(item[1] !== 0 && item[1] !== "0.00")
                            {
                                return <Currency currencyName={item[0]} currencyValue={item[1]} />
                            } 
                            return null;
                        })
                    }
                    </ul>
                </div>

                {/* Container that contains the links to our 3 main functions */}
                <div id="dashboard-options">
                    <Link className="dashboard-link" to="/deposit"> Deposit </Link>
                    <Link className="dashboard-link" to="/withdrawal"> Withdrawl </Link>
                    <Link className="dashboard-link" to="/transfer"> Transfer </Link>
                </div>
            </div>
        </div>
    )
}

// Export component
export default Dashboard
