import { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import {
    auth,
    registerWithEmailAndPassword,
    signInWithGoogle,
  } from "../Firebase/firebaseAuth";
import '../Styles/signup.css'
export const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error,setError] =useState('');
    const register = () => {
        if (!name) alert("Please enter name");
        registerWithEmailAndPassword(name, email, password);
      };
return (
<div className="loginContainer">
<form>
<h1>Sign Up</h1>
<div className="fieldwrapper">
<label className="inputField">Display Name</label>
<input className="inputField" placeholder="Display Name" type="text" value={name} onChange={event => setName(event.target.value)}></input>
</div>
<div className="fieldwrapper">
<label className="inputField">Email</label>
<input className="inputField" placeholder="Email" type="email" value={email} onChange={event => setEmail(event.target.value)}></input>
</div>
<div className="fieldwrapper">
<label className="inputField" >Password</label>
<input className="inputField" placeholder="Password" type="password" value={password} onChange={event => setPassword(event.target.value)}></input>
</div>
<button className="inputField" onClick={register}>
Sign up
</button>
<button
className="inputField"
onClick={signInWithGoogle}
>
Register with Google
</button>
<div>
Already have an account? <Link to="/">Login</Link> now.
</div>
<div className="error">{error}</div>
</form>
</div>
)
}
