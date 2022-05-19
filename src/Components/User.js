import React from 'react'
import { useState, useEffect } from 'react'
import { db } from '../Firebase/firebaseAuth';
import { logout } from '../Firebase/firebaseAuth';
import {collection, query, onSnapshot} from "firebase/firestore"
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase/firebaseAuth';
import { useNavigate } from 'react-router-dom';
import "../Styles/User.css"
import SideNav from './SideNav';

function UserPage() {
  const [users, setusers] = useState([])
  const [user, setUser] =useState('')
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })
    return () => {
        unsubscribe();
    }
}, [])

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
    <div className='userPage'>
      <SideNav></SideNav>
      <div className='users'>
        <h1>Users</h1>
        <input type="text" placeholder='Filter by user'></input>
        <div className='userDiv'>
          {users.map((user, index) => (
            <div key={index} className='userDetail'>
              <div className='userImg'><img alt='userimg' src='images/user.png'></img></div>
              <div className='userName'>
                <div>{user.data.name}</div>
                <div>{user.data.email}</div>
              </div>
            </div>
          ))
          }
        </div>
      </div>
    </div>
  )
}

export default UserPage
