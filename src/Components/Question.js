import { changeQuestionDownvotes } from "../Firebase/firebaseAuth";
import { changeQuestionUpvotes } from "../Firebase/firebaseAuth";
import { changeUserDownvotes, changeUserUpvotes, deleteQuestionFromDB } from "../Firebase/firebaseAuth";
import { changeAnswers } from "../Firebase/firebaseAuth";
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
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../Firebase/firebaseAuth';
import SideNav from "./SideNav"


function Question() {
    const [currentUser, setCurrentUser] = useState(''); 
    const { id } = useParams();
    const [questions, setquestions] = useState([]);
    const [question, setquestion]= useState('');
    const navigate = useNavigate();
    const [editorText,setEditorText]=useState('');
    const [users, setUsers] = useState([])
    

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setCurrentUser(currentUser)
          })
        const q = query(collection(db, 'Questions'))
        onSnapshot(q, (querySnapshot) => {
            setquestions(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
            const quser = query(collection(db, 'Users'))
            onSnapshot(quser, (querySnapshot) => {
              setUsers(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
              })))
            })
    })},[])


    useEffect(() => {
      setquestion(questions.find(question => question.id === id))
    },[questions])


  const deleteQuestion = (ev) => {
      if(currentUser.email === question.data.email)
      {
      try{
    ev.preventDefault();
    const user = users.find(user => user.data.email === currentUser.email)
    const questions = user.data.questions.filter(questionid => questionid !== question.id)
    deleteQuestionFromDB(question.id, user.id, questions).then(() => navigate('/questions'))
      }
      catch(err){
          console.log(err)
      }
  }
  else{
      alert("You are not authorised to delete this question!!")
  }
}

    const deleteAnswer = async(ans,ind) => {
        if(currentUser.email === ans.email){
        try{
        const answers = question.data.answers.filter((ans,index) => index !== ind)
        await changeAnswers(question.id, answers)
        navigate(`/question/${id}`)
        }
        catch(err){
            console.log(err)
        }
    }
    else{
        alert("You are not authorised to delete this answer!!")
    }
}
   
    function postAnswer(ev) {
      ev.preventDefault();
      try {
        sendAnswer(question.data.answers, editorText, id, currentUser.email, question.data.upvotes, question.data.downvotes)
            .then(_ => {
           navigate(`/question/${id}`)
            })
    }
    catch (err) {
        console.log(err)
    }
    }

    const setTextEditorValue=(textValue)=>{
      setEditorText(textValue);
    }
    
    const questionUpvoteHandler =async(ev) => {
        const user = users.find(user => user.data.email === currentUser.email)
        if(user.data.upvotes - user.data.downvotes >= 5){
        try{
        if(question.id, question.data.upvotes)
        ev.preventDefault();
        await changeQuestionUpvotes(question.id,question.data.upvotes)
        }
        catch(err){
            console.log(err)
        }
        users.forEach(user => {
            if(user?.data?.email === question?.data?.email){
                console.log("Success", user)
                changeUserUpvotes(user.id, user.data.upvotes)
            }
      })
    }
}


    const questionDownvoteHandler = async(ev) => {
        ev.preventDefault();
        const user = users.find(user => user.data.email === currentUser.email)
        if(user.data.upvotes - user.data.downvotes >= 5){
        try{
            if(question.id, question.data.downvotes)
            ev.preventDefault();
            await changeQuestionDownvotes(question.id,question.data.downvotes)
            }
            catch(err){
                console.log(err)
            }
            users.forEach(user => {
                if(user?.data?.email === question?.data?.email){
                    changeUserDownvotes(user.id, user.data.downvotes)
                }
          })
    }
}


    const answerUpvoteHandler = async(answer, index) => {
        const user = users.find(user => user.data.email === currentUser.email)
        if(user.data.upvotes - user.data.downvotes >= 5){
        try{
        const user = users.find(user => user.data.email === answer.email)
        changeUserUpvotes(user.id,user.data.upvotes)
        }
        catch(err){
            console.log(err)
        }
        const answers = question.data.answers;
        answers[index].upvotes += 1;
        await changeAnswers(question.id, answers)
    }
    else{
        alert("You have less than 5 reputation!!")
    }
}



const answerDownvoteHandler = async(answer, index) => {
    const user = users.find(user => user.data.email === currentUser.email)
    if(user.data.upvotes - user.data.downvotes >= 5){
    try{
    const user = users.find(user => user.data.email === answer.email)
    changeUserDownvotes(user.id,user.data.downvotes)
    }
    catch(err){
        console.log(err)
    }
    const answers = question.data.answers;
    answers[index].downvotes -= 1;
    await changeAnswers(question.id, answers)
}
}

    return (
        <>
            <div className="mainDiv">
                <SideNav></SideNav>


                <div className="middleDiv">
                    <div className="queTitle">
                        <div>

                        </div>
                        <div></div>
                        <span>{question?.data?.Title ? question.data.Title : ''}</span>
                        <button className="askQueBtn">
                            <Link className="linkSignup" to='/askPage'>Ask Question</Link>
                        </button>
                    </div>
                    <div className="queBody">
                        <div className="votes">
                            <button onClick={questionUpvoteHandler}><img src="images/upvote.jpeg"></img></button>
                            <div className="calVotes">{question?.data?.upvotes - Math.abs(question?.data?.downvotes)}</div>
                            <button onClick={questionDownvoteHandler}><img src="images/downvote.png"></img></button>
                        </div>
                        <div className="ansBody">
                            <p>{question?.data?.Body}</p>
                            <div className="ansUser">
                                <span className="editBtn">
                                    <button>edit</button>
                                    <button onClick={deleteQuestion}>delete</button>
                                </span>
                                <span>{question?.data?.email}</span>
                            </div>
                        </div>
                    </div>

                    <h1 className="totalAns">{question?.data?.answers.length} Answers</h1>

                    {question?.data?.answers.map((answer, index) => (
                        <div key={answer.body} className="allAns">
                            <div>
                                <button onClick={()=> answerUpvoteHandler(answer, index)}><img src="images/upvote.jpeg"></img></button>
                                <div className="calVotes">{answer.upvotes - Math.abs(answer.downvotes)}</div>
                                <button onClick={() => answerDownvoteHandler(answer, index)}><img src="images/downvote.png"></img></button>
                            </div>
                            <div className="ansBody">
                                <p>{answer.body}</p>
                                <div className="ansUser">
                                <span className="editBtn">
                                    <button>edit</button>
                                    <button onClick={() => deleteAnswer(answer,index)}>delete</button>
                                </span>
                                    <span>{answer.email}</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="addAns">
                        <p>Know someone who can answer? Share a link to this</p>
                        <h1>Your Answer</h1>
                        <MyEditor setTextEditorValue={setTextEditorValue} ></MyEditor>
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