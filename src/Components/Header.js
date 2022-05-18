import React from "react";
import { Link } from "react-router-dom";
import '../Styles/Header.css'
import { auth } from "../Firebase/firebaseAuth";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../Firebase/firebaseAuth";

function Header() {
    const [user, setUser] = useState(null)
    const navigate= useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => {
            unsubscribe();
        }
    }, [])
    const logOut = async() => {
        try{
          await logout();
          await navigate('/')
          console.log("successful logout")
        }
        catch(err){
          alert(err)
          navigate('/questions')
        }
      }
    return (
        <div>
            <div className="navbar">
                <div className="hamdiv">
                    <div className="ham"></div>
                    <div className="ham"></div>
                    <div className="ham"></div>
                </div>
                <a href="/questions"><div className="heading">
                    <img className="logoimg" src="images/logo.png" alt="logo"></img>
                </div></a>
                <span className="webname">stack <b> overflow clone</b></span>
                <input className="searchTab"></input>
                {!user&&(<div className="buttonDiv">
                <button className="loginBtn"><Link className='linkLogin' to='/'>Log in</Link></button>
                <button className="signupBtn"><Link className='linkSignup' to='/Signup'>Sign up</Link></button>
            </div>)}
            {user&&(
                <div>
                <span> {user.email}</span><span>  </span>
                <button className="signupBtn" onClick={logOut}>Log Out</button>
                </div>
           )}
            </div>
        </div>
    )
}

export default Header
