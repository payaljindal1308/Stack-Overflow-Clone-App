import { useEffect, useState } from "react"
import '../Styles/login.css'
import { Link, useNavigate } from "react-router-dom";
import { auth,logInWithEmailAndPassword, signInWithGoogle } from "../Firebase/firebaseAuth"
import {useAuthState} from "react-firebase-hooks/auth"
export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate()
console.log(signInWithGoogle)
useEffect(() => {
    if (loading) {
        console.log("Loading");
      }
    if (user) navigate('/Home');
    }, [user, loading]);

return (
<div className="loginContainer">
<form>
<h1>Login</h1>
<label className="inputField">Email</label>
<input className="inputField" placeholder="Email" type="email" value={email} onChange={event => setEmail(event.target.value)}></input>
<input className="inputField" placeholder="Password" type="password" value={password} autoComplete="current-password" onChange={event => setPassword(event.target.value)}></input>
<button className="inputField" onClick={() => logInWithEmailAndPassword(email, password)}>Login</button>
<button className="inputField" onClick={() => signInWithGoogle}>Login with Google</button>
<div><Link to="/reset">Forgot Password</Link></div>
<div>Don't have an account? <Link to="/signup">Register</Link> now.</div>
<div className="error">{error}</div>
</form>
</div>
)
}

