
import './App.css';
import { Login } from './Components/Login';
import { SignUp } from './Components/SignUp';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Question from './Components/Question';
import Reset from './Components/Reset';
import Header from './Components/Header';
import Questions from './Components/Questions';
import AskPage from './Components/AskQue';
import UserContext from './UserContext';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/firebaseAuth';
import ProtectedRoutes from './Components/ProtectedRoutes';
function App() {
  const [user,setUser] = useState('');
  useEffect(() =>  async function(){
    const unsubscribe = await onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })
    return () => {
        unsubscribe();
    }
}, [])

  return (
    <div className="App">
    <UserContext.Provider value={user}>
    <Header></Header>
    <Routes>
    <Route path="/" element={<Login/>}></Route>
    <Route path="/signup" element={<SignUp/>}></Route>
    <Route path="/reset" element={<Reset/>}></Route>
    <Route path="/home" element={<ProtectedRoutes><Home/></ProtectedRoutes>}></Route>
    <Route path="/question/:id" element={<ProtectedRoutes><Question/></ProtectedRoutes>}></Route>
    <Route path="/questions" element={<ProtectedRoutes><Questions/></ProtectedRoutes>}></Route>
    <Route path='/askPage' element={<ProtectedRoutes><AskPage /></ProtectedRoutes>}></Route>
    </Routes>
    </UserContext.Provider>
    </div>
  );
}

export default App;
