import styles from '../styles/ShareButton.module.css'
import { FaRegShareSquare } from "react-icons/fa";
import React from 'react';
import reactDom from 'react-dom';
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


function ShareButtonInit() {
    const facebookBtn = document.getElementById("facebook");
    const twitterBtn = document.getElementById("twitter");
    const pinterestBtn = document.getElementById("pinterest-btn");
    const linkedinBtn = document.getElementById("linkedin");
    const whatsappBtn = document.getElementById("whatsapp");


  //const pinterestImg = document.getElementById(".pinterest-img");

  let postUrl = encodeURI(document.location.href);
  let postTitle = encodeURI("Hi everyone, please check this out: ");
  //let postImg = encodeURI(pinterestImg.src);

  facebookBtn.setAttribute(
    "href",
    `https://www.facebook.com/sharer.php?u=${postUrl}`
  );

  twitterBtn.setAttribute(
    "href",
    `https://twitter.com/share?url=${postUrl}&text=${postTitle}`
  );

  pinterestBtn.setAttribute(
    "href",
    `https://pinterest.com/pin/create/bookmarklet/?media=${postImg}&url=${postUrl}&description=${postTitle}`
  );

  linkedinBtn.setAttribute(
    "href",
    `https://www.linkedin.com/shareArticle?url=${postUrl}&title=${postTitle}`
  );

  whatsappBtn.setAttribute(
    "href",
    `https://wa.me/?text=${postTitle} ${postUrl}`
  );
}


function ShareOptions(){
  //const pinterestImg = document.getElementById(".pinterest-img");

  let postUrl = encodeURI(document.location.href);
  let postTitle = encodeURI("Hi everyone, please check this out: ");
  //let postImg = encodeURI(pinterestImg.src);
  
  
  return(
        <div class={styles["share-btn-container"]}>
            <a id ="facebook" href={`https://www.facebook.com/sharer.php?u=${postUrl}`} class="facebook-btn">
                <i class="fab fa-facebook"></i>
            </a>

            <a id="twitter" href={`https://twitter.com/share?url=${postUrl}&text=${postTitle}`} class="twitter-btn">
                <i class="fab fa-twitter"></i>
            </a>

            <a id="pinterest" href={`https://pinterest.com/pin/create/bookmarklet/?url=${postUrl}&description=${postTitle}`} class="pinterest-btn">
                <i class="fab fa-pinterest"></i>
            </a>

            <a id="linkedin" href={`https://www.linkedin.com/shareArticle?url=${postUrl}&title=${postTitle}`} class="linkedin-btn">
                <i class="fab fa-linkedin"></i>
            </a>

            <a id="whatsapp" href={`https://wa.me/?text=${postTitle} ${postUrl}`} class="whatsapp-btn">
                <i class="fab fa-whatsapp"></i>
            </a>
        </div>
    )
}

export default function ShareButton()
{
    
    return(
        <div id = 'share-button-container' class="share-btn" onClick={
            () =>{
                
                const options = ShareOptions()
                const mainDiv = document.getElementById('main-container')
                const newSubDiv = document.createElement('div')
                mainDiv.appendChild(newSubDiv)
                //newSubDiv.className = styles['please-login-container']
                // newSubDiv.innerHTML = `${
                // <>
                //     <ShareOptions/>
                // </>
                // }`
                reactDom.render(options, newSubDiv)
                

            }
        }>
            <FaRegShareSquare />  
        </div>
    )
}