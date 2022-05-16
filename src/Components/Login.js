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
            navigate('/home')
        }
        catch(err){
            alert(err)
            navigate('/')
        }
    }

    const signinWithGoogle = async(e) => {
        try{
            e.preventDefault();
            await signInWithGoogle();
            navigate('/home')
        }
        catch(err){
            alert(err)
            navigate('/')
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
   

    return (
        <div className="loginContainer">
            <form>
                <h1>Login</h1>
                <label className="inputField">Email</label>
                <input className="inputField" placeholder="Email" type="email" value={email} onChange={event => setEmail(event.target.value)}></input>
                <input className="inputField" placeholder="Password" type="password" value={password} onChange={event => setPassword(event.target.value)}></input>
                <button className="inputField" onClick={(e) => logInWithEmail(e,email, password)}>Login</button>
                <button className="inputField" onClick={signinWithGoogle}>Login with Google</button>
                <div><Link to="/reset">Forgot Password</Link></div>
                <div>Don't have an account? <Link to="/signup">Register</Link> now.</div>
            </form>
        </div>
    )
}

