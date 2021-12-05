import React from 'react'
import Header from '../components/Header'
import { auth } from "../utils/firebase"
import { signOut } from "firebase/auth"
import '../styles/Exchange.css'
import { useState, useEffect, useRef } from 'react'
import db from "../utils/firebase"
import { doc, updateDoc, getDoc, onSnapshot } from "firebase/firestore"

// Exchange Component
// Contains the html that creates the layout of what the user
// sees when they are going to exchange currencies. It also contains
// Javascript functionality that connects the backend which is 
// Firebase, moveover the users authenticated Firestore. In addition
// we use Javascript to create a function that will handle the whole
// exchange action according to our flow diargram then redirects the user
// back to the dashboard component.
function Exchange() {
    
    // Hold our useStates and useRefs
    const exchangeRef = useRef();
    const currencyRef = useRef();
    const exchangeCurrencyRef = useRef();
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
    
    const handleExchange = async () => 
    {
        // Hold a refrence to the user's document in the Firestore
        const docRef = doc(db, "users",`${auth.currentUser.uid}`);
        // Wait and hold the user's document from its reference
        const docSnap = await getDoc(docRef);
        // Hold the data that inside the firestore in 'low-level' Javascript
        const data = docSnap.data();
        // Hold the current values of the useRefs
        const exchangeAmt = exchangeRef.current.value;
        const currency = currencyRef.current.value
        const exchangeCurrency = exchangeCurrencyRef.current.value;

        // Check if the exchange amount is valid
        if(exchangeAmt > data[currency])
        {
            alert("Invalid exchange amount")
            return;
        }

        // Make an api call by using fetch
        fetch(`https://v6.exchangerate-api.com/v6/51cc0b5d88707f27a97dd939/latest/${currencyRef.current.value}`)
        .then(response => response.json())
        // Then run another api call to the Firestore to update the wallet using our exchange rate
        .then(async (apiData) => 
            {
                // Holds the respective exchange rate
                const rate = apiData.conversion_rates[exchangeCurrencyRef.current.value].toFixed(2);
                // Update the users document
                await updateDoc(docRef, {
                    [exchangeCurrency]: (parseFloat(exchangeAmt * rate) + parseFloat(data[exchangeCurrency])).toFixed(2),
                    [currency]: (parseFloat(data[currency]) - parseFloat(exchangeAmt)).toFixed(2)
                })
                // Then the user is navigated back to the dashboard to see the changes
                .then(() =>
                    {
                        window.location= "/dashboard"
                    })
            })

             
    }

    // Function that updates the p tag with the appropriate exchange rate 
    // by making an api call
    const writeTransferRate = () =>
    {
        fetch(`https://v6.exchangerate-api.com/v6/51cc0b5d88707f27a97dd939/latest/${currencyRef.current.value}`)
        .then(response => response.json())
        .then(data => 
            {
                // Hold the respective exchange rate
                const rate = data.conversion_rates[exchangeCurrencyRef.current.value]
                // Update the p tag
                document.getElementById('transfer-rate').innerText = `1 ${currencyRef.current.value} = ${rate.toFixed(2)} ${exchangeCurrencyRef.current.value}`
            })
    }

    return (
        // Main div for page
        <div id="transfer">
            <Header logoutLink={logout} secondHref="/dashboard" secondLink="Dashboard" link="Logout" />
            
            <div id="transfer-container">
                <div id="transfer-container-two">
                    <h1>Exchange</h1>
                    <select ref={currencyRef} id="transfer-selectCurrency" onChange={writeTransferRate}>
                    {keys && keys.map((item) => 
                        {
                            // Only select from currencies you have money in
                            if(item[1] !== 0)
                            {
                                return <option value={item[0]}>{currenyNames[item[0]]}</option>
                            }
                            return null;
                        })
                    }
                    </select>
                    <input ref={exchangeRef} id="transfer-wallet" type="number" placeholder="Enter initial transfer" onChange={writeTransferRate} min={0}/>
                    {/* This updates based on the selected currency on top */}
                    <p id="transfer-rate"></p>
                    <select ref={exchangeCurrencyRef} id="transfer-selectCurrency" onChange={writeTransferRate}>
                        <option value="USD">US Dollar</option>
                        <option value="CHF">Swiss Franc</option>
                        <option value="EUR">European Euro</option>
                        <option value="KYD">Cayman Islands Dollar</option>
                        <option value="GIP">Gibraltar Pound</option>
                        <option value="GBP">Pound Sterling</option>
                        <option value="JOD">Jordanian Dinar</option>
                        <option value="CNY">Chinese Yuan</option>
                        <option value="MXN">Mexican Peso</option>
                        <option value="JPY">Japenese Yen</option>
                    </select>                   

                    {/* Button that handles the exchange */}
                    <button onClick={handleExchange} id="transfer-button">Submit</button>
                </div>
            </div>
        </div>
    )
}

// Export the component
export default Exchange
