import React from 'react'
import { useState, useEffect } from 'react'
import { db } from '../Firebase/firebaseAuth';
import { logout } from '../Firebase/firebaseAuth';
import {collection, query, onSnapshot} from "firebase/firestore"
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase/firebaseAuth';
import { useNavigate } from 'react-router-dom';
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
  return (
    <div>
    <h1>{user.name} Logged In</h1>
    {users.map((user, index) => (
         <li key={index}>{user.data.name }</li>
      ))
  } <button onClick={logOut}>Logout</button></div>
  )
}

export default Home