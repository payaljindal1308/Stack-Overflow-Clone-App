import React from "react";
import "../Styles/Tags.css"

function Tags(){
    return (
        <div className='tagPage'>
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
            <div className='tags'>
                <h1>Tags</h1>
                <input type="text" placeholder='Filter by user'></input>
                <div className='tagDiv'>
                    {/* {users.map((user, index) => ( */}
                    <div className='tagName'>
                        <div className='userImg'><img alt='userimg' src='images/user.png'></img></div>
                        <div className='userName'>
                            <div>user.data.name</div>
                            <div>user.data.email</div>
                        </div>
                    </div>
                    {/* )) */}
                    {/* } */}
                </div>
            </div>
        </div>
    )
}

export default Tags