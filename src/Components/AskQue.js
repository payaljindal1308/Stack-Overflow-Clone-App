import React from 'react'
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase/firebaseAuth';
import { collection, query, onSnapshot } from "firebase/firestore"
import { sendQuestion } from '../Firebase/firebaseAuth';
import { useNavigate } from 'react-router-dom';
import { db } from '../Firebase/firebaseAuth';
import '../Styles/AskQue.css'
import MyEditor from './Editor/MyEditor';


function AskPage() {
  const [user, setUser] = useState('')
  const [title, setTitle] = useState('');
  const [users, setusers] = useState([]);
  const [questions, setquestions] = useState([]);
  const [id, setid] = useState('');
  const navigate = useNavigate();
  const [editorText,setEditorText]=useState('');
  //const [usertags,setUsertags] = useState('');
  //const [tags, setTags] = useState([]);
  //const [dbtags, setDbtags] = useState([]);
  //const [newTags, setNewtags] = useState([]);
  //const [userpersonaltags, setuserpersonaltags] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    const q = query(collection(db, 'Users'))
    onSnapshot(q, (querySnapshot) => {
      setusers(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
    // const qtag = query(collection(db, 'Tags'))
    // onSnapshot(qtag, (querySnapshot) => {
    //   setDbtags(querySnapshot.docs.map(doc => ({
    //     id: doc.id,
    //     data: doc.data()
    //   })))
    // })
    // return () => {
    //   unsubscribe();
    // }
  }, [])


  useEffect(() => {
    if (id) {
      try {
        sendQuestion(title, editorText, user.email, id, questions)
          .then(_ => {
            navigate('/questions')
          })
      }
      catch (err) {
        console.log(err)
      }
    }
  }, [id, navigate]);


  async function postQuestion(ev) {
    ev.preventDefault();
    users.forEach(element => {
      if (element.data.email === user?.email) {
        console.log('executed');
        setid(element.id)
        setquestions(element.data.questions ? element.data.questions : [])
        //setuserpersonaltags(element.data.tags? element.data.tags: [])
      }
    })

    // usertags.forEach(tag => {
    //   setTags([...tags], dbtags.filter(dbtag => {
    //     if(dbtag.data.name === tag)
    //     {
    //       return {id: dbtag.id, questions: dbtag.questions}
    //     }
    //   }))
    // })
  }
  const setTextEditorValue=(textValue)=>{
    setEditorText(textValue);
  }

  // console.log(dbtags)
  
  return (
    <div>
      <div className='fullQuePage'>
        <div className='askHeading'>Ask a public question</div>
        <div className='quePage'>
          <div className='queForm'>
            <h1>Title</h1>
            <p>Be specific and imagine you're asking a question to another person</p>
            <input type="text" onChange={(e) => setTitle(e.target.value)} defaultValue={title}></input>
            <h1>Body</h1>
            <p>Include all the information someone would need to answer your question</p>
            <MyEditor setTextEditorValue={setTextEditorValue} ></MyEditor>
            <h1>Tags</h1>
            <p>Add up to 5 tags to describe what your question is about</p>
            <input type="text" defaultValue="e.g. (wordpress r css)"></input>
          </div>
          <div className='steps'>
            <div className='stepHeading'>Step 1: Draft your question</div>
            <p>The community is here to help you with specific coding, algorith, or language problems.</p>
            <p>Avoid asking opinion-based questions.</p>
            <div className='step'>1. Summarize the problem
              <ul>
                <li>Include details about your goal</li>
                <li>Describe expected and actual results</li>
                <li>Include any error messages</li>
              </ul>
            </div>
            <div className='step'>2. Describe what you've tried
              <p>
                Show what you’ve tried and tell us what you found (on this site or elsewhere) and why it didn’t meet your needs. You can get better answers when you provide research.
              </p>
            </div>
            <div className='step'>3. Show some code
              <p>
                When appropriate, share the minimum amount of code others need to reproduce your problem (also called a minimum, reproducible example)
              </p>
            </div>
          </div>
        </div>
        <div className='reviewBtnDiv'>
          <button className='reviewBtn' onClick={postQuestion}>Post your question</button>
        </div>
      </div>
    </div>
  )
}

export default AskPage