import React from 'react'
import '../styles/Currency.css'
// Wishlist
// add flag icons based on currency
// add currency symbol based on currency

// Currency component
// Contains the container for displaying the currency name and
// currency value. This component uses props so it can be dynamic
function Currency(props) 
{
    return (
        // Main container for the list item
        <div id="currency">
            {/* li element for the component */}
            <li>{props.currencyName}: {props.currencyValue}</li>
        </div>
    )
}

// Export the component
export default Currency
