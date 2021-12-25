import styles from '../styles/ShareButton.module.css'
import { FaInstagram,FaRegShareSquare, FaWhatsapp, FaLinkedin, FaFacebook, FaPinterest, FaTwitter } from "react-icons/fa";
import React from 'react';
import reactDom from 'react-dom';
import removeElementsByClass from '../lib/removeElementsByClassName';
/* 
Social Share Links:
WhatsApp:
https://wa.me/?text=[post-title] [post-url]
Facebook:
https://www.facebook.com/sharer.php?u=[post-url]
Twitter:
https://twitter.com/share?url=[post-url]&text=[post-title]
Pinterest:
https://pinterest.com/pin/create/bookmarklet/?media=[post-img]&url=[post-url]&is_video=[is_video]&description=[post-title]
LinkedIn:
https://www.linkedin.com/shareArticle?url=[post-url]&title=[post-title]
*/



function ShareOptions({link}){
  //const pinterestImg = document.getElementById(".pinterest-img");
  
  let postUrl = link?encodeURI(window.location.origin+link):encodeURI(document.location.href);
  let postTitle = encodeURI("Hello, Check out this cool article : ");
  //let postImg = encodeURI(pinterestImg.src);
  
            // <a id ="instagram" href={} className="instagram-btn">
            //     <FaInstagram/>
            // </a>
  
  return(
        <div className={styles["share-btn-container"]}>

            <a id ="facebook" href={`https://www.facebook.com/sharer.php?u=${postUrl}`} className="facebook-btn">
                <FaFacebook/>
            </a>

            <a id="twitter" href={`https://twitter.com/share?url=${postUrl}&text=${postTitle}`} className="twitter-btn">
                <FaTwitter/>
            </a>

            <a id="pinterest" href={`https://pinterest.com/pin/create/bookmarklet/?url=${postUrl}&description=${postTitle}`} className="pinterest-btn">
                <FaPinterest/>
            </a>

            <a id="linkedin" href={`https://www.linkedin.com/shareArticle?url=${postUrl}&title=${postTitle}`} className="linkedin-btn">
                <FaLinkedin/>
            </a>

            <a id="whatsapp" href={`https://wa.me/?text=${postTitle} ${postUrl}`} className={styles["whatsapp-btn"]}>
                <FaWhatsapp/>
            </a>
        </div>
    )
}

export default function ShareButton(link)
{
    
    return(
        <div id = 'share-button-container' className="share-btn" onClick={
            () =>{
                removeElementsByClass("share-options");
                const options = ShareOptions(link)
                const mainDiv = document.getElementById('main-container')
                const newSubDiv = document.createElement('div')
                newSubDiv.className = "share-options"
                mainDiv.appendChild(newSubDiv)
                reactDom.render(options, newSubDiv)
                

            }
        }>
            <FaRegShareSquare />  
        </div>
    )
}