import React from "react";
import "../Styles/Tags.css"
import SideNav from "./SideNav";
import { query, collection, onSnapshot } from 'firebase/firestore'
import { db } from '../Firebase/firebaseAuth'
import { useEffect, useState } from "react";
function Tags(){


const [dbtags, setdbTags] = useState([])
useEffect(() => {
  const q = query(collection(db, 'Tags'))
  onSnapshot(q, (querySnapshot) => {
    setdbTags(querySnapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data()
    })))
  })
},[])
    return (
        <div className='tagPage'>
            <SideNav></SideNav>
            <div className='tags'>
                <h1>Tags</h1>
                <input type="text" placeholder='Filter by user'></input>
                <div className='tagDiv'>
                    {dbtags.map((tag, index) => ( 
                    <div className='tagName'>
                        <div className='userImg'></div>
                        <div className='userName'>
                            <div>{tag.data.name}</div>
                        </div>
                    </div>
                     )) }
                </div>
            </div>
        </div>
    )
}

export default Tags