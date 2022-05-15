import logo from './logo.svg';
import { db } from './Firebase/firebasedb';
import { useEffect, useState } from 'react';
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import './App.css';
import { Login } from './Components/Login';
import { SignUp } from './Components/SignUp';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Question from './Components/Question';
import Reset from './Components/Reset';
function App() {

  const [users, setusers] = useState([])
//   /* function to get all tasks from firestore in realtime */
// useEffect(() => {
//   const q = query(collection(db, 'Users'))
//   onSnapshot(q, (querySnapshot) => {
//     setusers(querySnapshot.docs.map(doc => ({
//       id: doc.id,
//       data: doc.data()
//     })))
//   })
//   console.log(users)
// },[])
  return (
    <div className="App">
    <Routes>
    <Route path="/" element={<Login/>}></Route>
    <Route path="/signup" element={<SignUp/>}></Route>
    <Route path="/reset" element={<Reset/>}></Route>
    <Route path="/home" element={<Home/>}></Route>
    <Route path="/questions" element={<Question/>}></Route>
    </Routes>
      {//users.map((user, index) => (
    //     <li key={index}>{user.data.name }</li>
    //  ))
      }
     
    </div>
  );
}

export default App;
