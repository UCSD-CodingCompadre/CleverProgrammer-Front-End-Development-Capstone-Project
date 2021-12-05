import React from 'react'
import "../styles/Header.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faWallet } from '@fortawesome/free-solid-svg-icons'

// Header component
// Contains the header for the web application, this is
// displayed in every page the user sees in the application.
function Header(props) 
{
    // This component uses props so it can be dynamic
    const {link, headerStatement, href, logoutLink, dashLink, secondLink, secondHref} = props
    
    return (
        // Main container for the header
        <div className="header">
            {/* Holds the container for the logo */}
            <div className="header-logo">
                <FontAwesomeIcon className="header-icon" icon={faWallet} />
                <h1 className="header-title">Yung Mula</h1>
            </div>
            {/* Holds the container for the links */}
            <div className="links">
                <p>{headerStatement}
                <a href={secondHref}><span onClick={dashLink} className="header-signInLink">{secondLink}</span></a>
                <a href={href}><span onClick={logoutLink} className="header-signInLink">{link}</span></a>
                </p>
            </div>
        </div>
    )
}

// Export the component
export default Header
