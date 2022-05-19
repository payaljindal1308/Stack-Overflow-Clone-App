import React from "react";
import "../Styles/Tags.css"
import SideNav from "./SideNav";

function Tags(){
    return (
        <div className='tagPage'>
            <SideNav></SideNav>
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