import React from 'react'
import { useState, useEffect } from 'react'
import { db } from '../Firebase/firebaseAuth';
import { logout } from '../Firebase/firebaseAuth';
import {collection, query, onSnapshot} from "firebase/firestore"
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase/firebaseAuth';
import { useNavigate, Link } from 'react-router-dom';
function Home() {
  const [users, setusers] = useState([])
  const [user, setUser] =useState('')
  const navigate = useNavigate();
  const logOut = async() => {
    try{
      await logout();
      await navigate('/')
      console.log("successful logout")
    }
    catch(err){
      alert(err)
      navigate('/home')
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
// useEffect(() => {
//     if (!user) navigate('/');
// }, [user]);

useEffect(() => {
  const q = query(collection(db, 'Users'))
  onSnapshot(q, (querySnapshot) => {
    setusers(querySnapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data()
    })))
  })
},[])
users.map(element => {
  if(element.data.email === user.email){
    user.name = element.data.name
  }
})
//   return (
//     <div>
//     <h1>{user.name} Logged In</h1>
//     {users.map((user, index) => (
//          <li key={index}>{user.data.name }</li>
//       ))
//   } <button onClick={logOut}>Logout</button></div>
//   )
// }
return (
  <>
      <div className="mainDiv">
          <div className="leftdiv">
              <div className="homelink">
                  <a href="/questions">Home</a>
              </div>
              <span className="public">PUBLIC</span>
              <div className="publicLink">
                  <a href="/questions">
                      <span> Questions</span></a>
                  <a href="/questions">Tags</a>
                  <a href="/home">Users</a>
              </div>
          </div>
          <div className="midDiv">
              <div className="topque">
                  <span>Users</span>
                  <button className="askQueBtn">
                      <Link className="linkSignup" to='/askPage'>Ask Question</Link>
                  </button>
              </div>
              <div>
                  {
                      users.map(user => {
                          return <div className="allQuediv">
                                  <div>
                                      <Link to={`/user/${user.id}`}>{user.data.name}</Link>
                                  </div>
                                  <div></div>
                              </div>                           
                      })
                  }
              </div>
          </div>
          <div className="rightdiv">
              <div className="rightDivHeading">The Overflow Blog</div>
              <div className="rightDivexp">
                  <p>Software is adopted, not sold</p>
                  <p>An unfiltered look back at Aprail Fools' 2022</p>
              </div>
              <div className="rightDivHeading">Featured on Meta</div>
              <div className="rightDivexp">
                  <p>Retiring Community-Specific Closure Reasons for Server Fault and Super User</p>
                  <p>Staging Ground: Reviewer Motivation, Scaling, and Open Questions</p>
              </div>
              <div className="rightDivHeading">Hot Meta Posts</div>
              <div className="rightDivexp">
              <p>Inconsistency behaviour for "Unfollow" and "Too Many Pending Edits" popup modals</p>
              </div>
              
          </div>
      </div>
  </>    
)
}
export default Home