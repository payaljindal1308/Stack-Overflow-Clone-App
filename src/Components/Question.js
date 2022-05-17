import React from 'react'
import { Link } from 'react-router-dom'

function Question() {
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