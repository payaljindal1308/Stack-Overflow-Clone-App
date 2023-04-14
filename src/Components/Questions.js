import React , { useState, useEffect } from "react";
import '../Styles/Questions.css'
import { query, collection, onSnapshot } from 'firebase/firestore'
import { db } from '../Firebase/firebaseAuth'
import { Link } from "react-router-dom";
import '../Styles/Question.css'
import SideNav from "./SideNav";


function Questions(){
console.log("questions called")
const [questions, setquestions] = useState([])
const [Questions, setQuestions] = useState([])
useEffect(() => {
  const q = query(collection(db, 'Questions'))
  onSnapshot(q, (querySnapshot) => {
    setquestions(querySnapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data(),
      timestamp: doc._document.version.timestamp.seconds
    })))
  })
  
},[])
console.log("Questions are:", questions)
useEffect(() => {
    setQuestions(questions.sort((a,b) => b.timestamp - a.timestamp))
})
    return (
        
        <>
            <div className="mainDiv">
                <SideNav></SideNav>
                <div className="midDiv">
                    <div className="topque">
                        <span>Recent Questions</span>
                        <button className="askQueBtn">
                            <Link className="linkSignup" to='/askPage'>Ask Question</Link>
                        </button>
                    </div>
                    <div>
                        {
                            Questions.map(que => {
                                return <div key={que.id} className="allQuediv">
                                    <div><Link to={`/question/${que.id}`}>{que.data.Title}</Link></div>
                                    <div className="queTag">
                                        {que?.data?.tags?.map(tag => (
                                            <button key={tag}>{tag}</button>
                                        ))}
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
                <div className="rightdiv">
                    <div className="rightDivHeading">The Overflow Blog</div>
                    <div className="rightDivexp">
                        <p>Software is adopted, not sold</p>
                        <p>An unfiltered look back at April Fools' 2022</p>
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

export default Questions