import React from 'react'
import { useState, useEffect } from 'react'
import { db } from '../Firebase/firebasedb';
import { logout } from '../Firebase/firebaseAuth';
import {collection, query, onSnapshot} from "firebase/firestore"
function Home() {
  const [users, setusers] = useState([])
useEffect(() => {
  const q = query(collection(db, 'Users'))
  onSnapshot(q, (querySnapshot) => {
    setusers(querySnapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data()
    })))
  })
  console.log(users)
},[])
  return (
    <div>
    {users.map((user, index) => (
         <li key={index}>{user.data.name }</li>
      ))
     
  } <button onClick={logout}>Logout</button></div>
  )
}

export default Home