import React from "react";
import "../Styles/SideNav.css"
 function SideNav(){
     return (
         <div className="leftdiv">
             <div className="homelink">
                 <a href="/home">Home</a>
             </div>
             <span className="public">PUBLIC</span>
             <div className="publicLink">
                 <a href="/questions">
                     <span> Questions</span></a>
                 <a href="/tag">Tags</a>
                 <a href="/user">Users</a>
             </div>
         </div>
     )
 }

 export default SideNav