import React from 'react'
import { useState, useEffect } from 'react'
import { auth } from '../Firebase/firebaseAuth'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
function ProtectedRoutes({children}) {
    const [user, setUser] = useState({})
    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => {
            unsubscribe();
        }
    }, [])
   if(!user){
      navigate('/')
   }
   else{
       return children;
   }
}

export default ProtectedRoutes