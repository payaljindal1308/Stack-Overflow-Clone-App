import { useEffect, useState } from "react"
import '../Styles/login.css'
import { onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../Firebase/firebaseAuth"
import { useAuthState } from "react-firebase-hooks/auth"
export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [user, setUser] = useState('');


    const logInWithEmail = async(e, email, password) => {
        try{
            e.preventDefault();
            await logInWithEmailAndPassword(email,password);
            navigate('/questions')
        }
        catch(err){
            alert(err)
            navigate('/Login')
        }
    }

    const signinWithGoogle = async(e) => {
        try{
            e.preventDefault();
            await signInWithGoogle();
            navigate('/questions')
        }
        catch(err){
            alert(err)
            navigate('/Login')
        }
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => {
            unsubscribe();
        }
    }, [])
   
    useEffect(()=>{
        if(user){
            navigate('/questions')
        }
        else{
            navigate('/Login')
        }
    },[user])

    return (
        <>
        <div className="loginContainer">
            <div className="logoImgDiv"><img src="images/logo.png" alt="img"></img></div>
            <button className="inputField"  onClick={signinWithGoogle}>
                <img src="images/googleLogo1.png" alt="googleimg"></img>
                <span> Log in with Google</span></button>
            <form className="formField">
                <label>Email</label>
                <input type="email" onChange={event => setEmail(event.target.value)}></input>
                <label >Password
                    <Link className="forgotLink" to="/reset">Forgot password?</Link>
                </label>
                <input type="password" autoComplete="current-password" onChange={event => setPassword(event.target.value)}></input>
                <button className="loginButton" onClick={(e) => logInWithEmail(e,email, password)}>Log in</button>
            </form>
            <div className="reset">Don't have an account? <Link className="resetLink" to="/Signup">Sign up</Link></div>
        </div>
    </>
    )
}

