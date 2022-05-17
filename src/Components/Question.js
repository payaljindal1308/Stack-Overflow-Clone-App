import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { sendAnswer } from '../Firebase/firebaseAuth';
import { query, collection, onSnapshot } from 'firebase/firestore'
import { db } from '../Firebase/firebaseAuth'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Question(props) {
  const {id} = useParams();
  const [answers, setanswers] = useState([]);
  const [answer, setAnswer] = useState('');
  const [questions, setquestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, 'Questions'))
    onSnapshot(q, (querySnapshot) => {
      setquestions(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  },[])

  useEffect(() => {
    if (answers) {
      try {
        sendAnswer(answers, answer, id)
          .then(_ => {
            navigate(`/question/${id}`)
          })
      }
      catch (err) {
        console.log(err)
      }
    }
  },[answers])

  
async function postAnswer(ev) {
  try{
    questions.forEach(question =>{
      if(question.id === id){
        setanswers(question.data.answers)
      }})
  }
  catch(err){
    console.log(err)
  }
}


  return (
    <div>
      <div className="queHeading">
        <span>I would like to launch my function when the user types text in the fields</span>
        <button className="askQueBtn">
          <Link className="linkSignup" to='/askPage'>Ask Question</Link>
        </button>
      </div>
      <div className='userQue'>
        <input type="text"></input>
      </div>
    </div>
  )
}

export default Question