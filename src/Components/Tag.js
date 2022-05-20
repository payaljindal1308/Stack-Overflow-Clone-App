import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { query, collection, onSnapshot } from 'firebase/firestore'
import { db } from '../Firebase/firebaseAuth';
import SideNav from './SideNav';
import "../Styles/Tag.css"
function Tag() {

    const { name } = useParams();
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState('');
    const [questions, setQuestions] = useState([]);
    const [quest,setquest] = useState([]);
    const [tagques, settagques] = useState([]);
    useEffect(() => {
        const q = query(collection(db, 'Tags'))
        onSnapshot(q, (querySnapshot) => {
            setTags(querySnapshot.docs.map(doc => ({
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
    }, [])

    useEffect(() => {
        setTag(tags.find(tag => tag.data.name === name))
    }, [tags])

  

    return (
        <div className='tagpage'>
            <SideNav></SideNav>
            <div className='tagdiv'>
                <div className='tagHead'>Question Tagged [{tag?.data?.name}]</div>
                <div className='tagQue'>
                    {questions.map(question => (
                        <div key={question.id}>
                            {tag?.data?.questions.indexOf(question.id) >= 0 && (<div className='tagque'><div>{question.data.Title}</div>
                            <div>{question.data.Body}</div></div>)}
                        </div>))}
                </div>
            </div>
            <div className="rightdiv">
                    <div className="rightDivHeading">The Overflow Blog</div>
                    <div className="rightDivexp">
                        <p>Open-source is winning over developers and investors</p>
                        <p>Crystal balls and clairvoyance: Future proofing in a world of inevitable change</p>
                    </div>
                    <div className="rightDivHeading">Featured on Meta</div>
                    <div className="rightDivexp">
                        <p>Announcing the arrival of Valued Associate #1214: Dalmarus</p>
                        <p>Staging Ground: Reviewer Motivation, Scaling, and Open Questions</p>
                        <p>Retiring Our Community-Specific Closure Reasons for Server Fault and Super User</p>
                        <p>Temporarily pausing the site satisfaction survey</p>
                        <p>Rule proposal: comments asking for accepts and votes shall no longer be allowed</p>
                    </div>
                    </div>
        </div>
    )
}

export default Tag
