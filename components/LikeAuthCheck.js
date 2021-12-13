import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/authContext";
import styles from "../styles/LikeAuthCheck.module.css";
import { AiOutlineLike } from 'react-icons/ai'; 
import {createElement} from 'react';
import router, { useRouter } from 'next/router';
function display(e)
{
    const currentDiv = e.currentTarget
    const newSubDiv = document.createElement("button");

    newSubDiv.className = styles['signup-container']
    
    newSubDiv.innerHTML = `<a href="/auth"> Please Sign In to Like</a>`
    currentDiv.appendChild(newSubDiv)
    

    //const target = `<div className={styles['signup-container']}><Link href="/auth">Please Sign In</Link></div>`
    //debugger
}
const LikeAuthCheck = (props) => {
    const { username } = useContext(UserContext);

    return (  
        username ? props.children : props.fallback ||<div onClick={display}> <AiOutlineLike/> </div> 
    );
}
 
export default LikeAuthCheck;