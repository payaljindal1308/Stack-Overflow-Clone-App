import React from "react";
import { Link } from "react-router-dom";
import './Header.css'

function Header() {
    return (
        <div>
            <div className="navbar">
                <div className="hamdiv">
                    <div className="ham"></div>
                    <div className="ham"></div>
                    <div className="ham"></div>
                </div>
                <div className="heading">
                    <img className="logoimg" src="images/logo.png" alt="logo"></img>
                </div>
                <span className="webname">stack <b> overflow clone</b></span>
                <input className="searchTab" value='Search...'></input>
                <div className="buttonDiv">
                    <button className="loginBtn"><Link className='linkLogin' to='/Login'>Log in</Link></button>
                    <button className="signupBtn"><Link className='linkSignup' to='/Signup'>Sign up</Link></button>
                </div>
                
            </div>
        </div>
    )
}

export default Header
