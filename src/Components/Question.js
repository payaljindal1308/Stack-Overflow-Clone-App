


import React, { useState, useEffect } from "react";
import '../Styles/Questions.css'
import { sendAnswer } from '../Firebase/firebaseAuth';
import { query, collection, onSnapshot } from 'firebase/firestore'
import { db } from '../Firebase/firebaseAuth'
import { Link } from "react-router-dom";
import '../Styles/Question.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MyEditor from "./Editor/MyEditor";


function Question() {
    const { id } = useParams();
    const [answer, setAnswer] = useState('');
    const [questions, setquestions] = useState([]);
    const [question, setquestion]= useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const q = query(collection(db, 'Questions'))
        onSnapshot(q, (querySnapshot) => {
            setquestions(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
    })},[])


    useEffect(() => {
      setquestion(questions.find(question => question.id === id))
    },[questions])
  



    function postAnswer(ev) {
      ev.preventDefault();
      try {
        sendAnswer(question.data.answers, answer, id)
            .then(_ => {
           navigate(`/question/${id}`)
            })
    }
    catch (err) {
        console.log(err)
    }
    }
console.log(question)
    return (
     
        <>
            <div className="mainDiv">
                <div className="leftdiv">
                    <div className="homelink">
                        <a href="/questions">Home</a>
                    </div>
                    <span className="public">PUBLIC</span>
                    <div className="publicLink">
                        <a href="/questions">
                            <span> Questions</span></a>
                        <a href="/tag">Tags</a>
                        <a href="/user">Users</a>
                    </div>
                </div>


                <div className="middleDiv">
                    <div className="queTitle">
                        <span>{question?.data?.Title?question.data.Title: ''}</span>
                        <button className="askQueBtn">
                            <Link className="linkSignup" to='/askPage'>Ask Question</Link>
                        </button>
                    </div>
                    <div className="queBody">
                        <p>{question?.data?.Body}</p>
                        <div className="ansUser">{question?.data?.email}</div>
                    </div>
                    
                    {question?.data?.answers.map((answer) => (
                      <div key={answer} className="allAns">
                      <p>{answer}</p>
                  </div>
                    ))}
                    
                    <div className="addAns">
                    <p>Know someone who can answer? Share a link to this</p>
                        <h1>Your Answer</h1>
                        <textarea></textarea> 
                        <MyEditor></MyEditor>
                        <button className='reviewBtn' onClick={postAnswer}>Post Your Answer</button>
                    </div>
                </div>



                <div className="rightdiv">
                    <div className="rightDivHeading">The Overflow Blog</div>
                    <div className="rightDivexp">
                        <p>Software is adopted, not sold</p>
                        <p>An unfiltered look back at Aprail Fools' 2022</p>
                    </div>
                    <div className="rightDivHeading">Featured on Meta</div>
                    <div className="rightDivexp">
                        <p>Retiring Community-Specific Closure Reasons for Server Fault and Super User</p>
                        <p>Staging Ground: Reviewer Motivation, Scaling, and Open Questions</p>
                    </div>
                    <div className="rightDivHeading">Hot Meta Posts</div>
                    <div className="rightDivexp">
                        <p>Inconsistency behaviour for "Unfollow" and "Too Many Pending Edits" popup modals</p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Question