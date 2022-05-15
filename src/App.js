
import './App.css';
import { Login } from './Components/Login';
import { SignUp } from './Components/SignUp';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Question from './Components/Question';
import Reset from './Components/Reset';
function App() {

  
  return (
    <div className="App">
    <Routes>
    <Route path="/" element={<Login/>}></Route>
    <Route path="/signup" element={<SignUp/>}></Route>
    <Route path="/reset" element={<Reset/>}></Route>
    <Route path="/home" element={<Home/>}></Route>
    <Route path="/questions" element={<Question/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
