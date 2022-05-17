import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {auth,registerWithEmailAndPassword,signInWithGoogle} from "../Firebase/firebaseAuth";
import '../Styles/signup.css'

export const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    // const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const register = async(e) => {
      e.preventDefault()
      try{
        if (!name) alert("Please enter name");
        await registerWithEmailAndPassword(name, email, password);
        navigate('/')
      }
      catch(err){
        setError(err)
        console.log(err)
      }
      };
      const signinWithGoogle = async(e) => {
        try{
            e.preventDefault();
            await signInWithGoogle();
            navigate('/questions')
        }
        catch(err){
            alert(err)
        }
      }
      const [user, setUser] = useState('')
      useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser)
       })
       return () => {
         unsubscribe();
       }
      },[])

      useEffect(() => {
        if(user){
          navigate('/questions')
        }
      },[user])
  return (
    <div className="signupContainer">
      <div className="signupHeading">Create your Stack Overflow Clone account. It's free and only takes a minute.</div>
      <div>
        <button className="signupGoogleField" onClick={signinWithGoogle}>
          {/* <img src="images/googleLogo1.png" alt="googleimg"></img> */}
          <span> Sign up with Google</span>
        </button>
      </div>
      <form className="signupForm">
        <label>Display Name</label>
        <input type="text" onChange={event => setName(event.target.value)}></input>
        <label>Email</label>
        <input type="email" onChange={event => setEmail(event.target.value)}></input>
        <label>Password</label>
        <input type="password" onChange={event => setPassword(event.target.value)}></input>
        <p>Password must contain at least eight characters, including at least 1 letter and 1 number.</p>
        <button className="signupButton" onClick={register}>Sign up</button>
      </form>
      <div className="reset">
        Already have an account? <Link className="resetLink" to="/">Log in</Link>
        <div className="error">{error}</div>
      </div>
    </div>
  )
}
