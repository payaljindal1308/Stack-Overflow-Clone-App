
import './App.css';
import { Login } from './Components/Login';
import { SignUp } from './Components/SignUp';
import { Route, Routes } from 'react-router-dom';
import UserPage from './Components/User';
import Question from './Components/Question';
import Reset from './Components/Reset';
import Header from './Components/Header';
import Questions from './Components/Questions';
import AskPage from './Components/AskQue';
import UserContext from './UserContext';
import Profile from './Components/Profile';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/firebaseAuth';
import Tags from './Components/Tags';
import Tag from './Components/Tag';
import ProtectedRoutes from './Components/ProtectedRoutes';
import Home from './Components/Home';
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
<<<<<<< HEAD
      <h1>hello world !</h1>
=======
    <UserContext.Provider value={user}>
    <Header></Header>
    <Routes>
    <Route path="/" element={<Login/>}></Route>
    <Route path="/signup" element={<SignUp/>}></Route>
    <Route path="/reset" element={<Reset/>}></Route>
    <Route path="/home" element={<ProtectedRoutes><Home/></ProtectedRoutes>}></Route>
    <Route path="/user" element={<ProtectedRoutes><UserPage/></ProtectedRoutes>}></Route>
    <Route path="/user/:id" element={<ProtectedRoutes><Profile/></ProtectedRoutes>}></Route>
    <Route path="/question/:id" element={<ProtectedRoutes><Question/></ProtectedRoutes>}></Route>
    <Route path="/questions" element={<ProtectedRoutes><Questions/></ProtectedRoutes>}></Route>
    <Route path='/askPage' element={<ProtectedRoutes><AskPage /></ProtectedRoutes>}></Route>
    <Route path="/tag" element={<ProtectedRoutes><Tags /></ProtectedRoutes>}></Route>
    <Route path="tag/:name" element={<ProtectedRoutes><Tag /></ProtectedRoutes>}></Route>
    </Routes>
    </UserContext.Provider>
>>>>>>> development
    </div>
  );
}

export default App;
