import React , { useState, useEffect } from "react";
import '../Styles/Questions.css'
import { query, collection, onSnapshot } from 'firebase/firestore'
import { db } from '../Firebase/firebaseAuth'
import { Link } from "react-router-dom";
import '../Styles/Question.css'


function Questions(){

const [questions, setquestions] = useState([])
useEffect(() => {
  const q = query(collection(db, 'Questions'))
  onSnapshot(q, (querySnapshot) => {
    setquestions(querySnapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data()
    })))
  })
},[])

questions.map(element => {
  console.log(element.data.Title)
})

    return (
        <>
            <div className="mainDiv">
                <div className="leftdiv">
                    <div className="homelink">
                        <a href="/">Home</a>
                    </div>
                    <span className="public">PUBLIC</span>
                    <div className="publicLink">
                        <a href="/questions">
                            <span> Questions</span></a>
                        <a href="/">Tags</a>
                        <a href="/">Users</a>
                    </div>
                </div>


                <div className="midDiv">
                    <div className="topque">
                        <span>Top Questions</span>
                        <button className="askQueBtn">
                            <Link className="linkSignup" to='/askPage'>Ask Question</Link>
                        </button>
                    </div>
                    <div>
                        {
                            questions.map(que => {
                                
                                return <div className="allQuediv">
                                        <div>
                                            <Link to="/question">{que.data.Title}</Link>
                                        </div>
                                        <div></div>
                                    </div>                           
                            })
                        }
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

export default Questions