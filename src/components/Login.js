import React from 'react'
import "../styles/Login.css"


// Login component
// Contains the login page element for the webapplication. 
// This component has the necessary elements needed on the
// front end to start working with the backend.
function Login(props) 
{
    // This component uses props so it can be dynamic
    const {title, button, btnFunction, emailInput, passwordInput} = props

    return (
    // Main container for the login component
    <div className="login">
        {/* Holds the container for the login elements */}
        <div className="login-container">
            <h1 className="login-heading">{title}</h1>
            <input ref={emailInput} className="login-email" type="email" placeholder="Email"/>
            <input ref={passwordInput} className="login-password" type="password" placeholder="Password"/>
            <button onClick={btnFunction} className="login-button">{button}</button>
        </div>
    </div>
    )
}

// Export the component
export default Login