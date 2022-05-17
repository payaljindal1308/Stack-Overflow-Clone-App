
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
function App() {

  
  return (
    <div className="App">
    <Header></Header>
    <Routes>
    <Route path="/Login" element={<Login/>}></Route>
    <Route path="/signup" element={<SignUp/>}></Route>
    <Route path="/reset" element={<Reset/>}></Route>
    <Route path="/home" element={<Home/>}></Route>
    <Route path="/question" element={<Question/>}></Route>
    <Route path="/questions" element={<Questions/>}></Route>
    <Route path='/askPage' element={<AskPage></AskPage>}></Route>
    </Routes>
    </div>
  );
}

export default App;
