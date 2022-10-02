import React, { useEffect, useState } from "react";
import SideNav from "./SideNav";
import "../Styles/Profile.css"
import { useParams } from "react-router-dom";
import { query, collection, onSnapshot } from 'firebase/firestore'
import { db } from '../Firebase/firebaseAuth';

function Profile(){
    const { id } = useParams();
    const [users, setUsers] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [user, setUser] = useState('');

    useEffect(() => {
        const q = query(collection(db, 'Users'))
        onSnapshot(q, (querySnapshot) => {
            setUsers(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        const qques = query(collection(db, 'Questions'))
        onSnapshot(qques, (querySnapshot) => {
            setQuestions(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    },[])

    useEffect(() => {
        setUser(users.find(user => user.id === id))
    }, [users])

  

    return(
        <div className="pageOfUser">
            <SideNav></SideNav>
            <div className="mainUserPage">
                <div className="userHead">
                    <img src = "../images/user1.png" alt="user"></img> 
                    <span>{user?.data?.name}</span>
                </div>
                <div className="describe">
                    <div className="stats">
                        <div className="h2">Stats</div>
                        <div className="userData">
                            <div className="allCategory">
                                <div className="value">{user?.data?.upvotes - user?.data?.downvotes}</div>
                                <span className="category">reputation</span>
                            </div>
                            <div className="allCategory">
                                <div className="value">{user?.data?.questions.length}</div>
                                <span className="category">question</span>
                            </div>   
                            <div className="allCategory">
                                <div className="value">{user?.data?.upvotes}</div>
                                <span className="category">up votes</span>
                            </div>   
                            <div className="allCategory">
                                <div className="value">{user?.data?.downvotes}</div>
                                <span className="category">down votes</span>
                            </div>                   
                        </div>
                    </div>
                    <div className="aboutUser">
                        <div className="h2">About</div>
                        <p>I'm a software engineer with a particular interest in web technologies (esp. JavaScript and, increasingly, TypeScript). I also do lots of work in C#, and formerly Java, and several other languages. I've been doing this professionally for over 30 years, goofing with computers for 10 years before that, but I hope I'm not this guy.</p>
                    </div>
                </div>

                <div className="userQuestion">
                   <div>
                       <div className="h2">Posted Questions</div>
                       <div className="queOfUser">
                       { questions.map(question => (
                        <div key={question.id}>
                         {user?.data?.questions.indexOf(question.id) >= 0 &&(<div className="perQueOfUser">{question.data.Title}</div>)}
                </div>))}
                       </div>
                   </div>
                </div>
            </div>
        </div>
    )
}

export default Profile