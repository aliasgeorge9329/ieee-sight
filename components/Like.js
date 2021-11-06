import React, { Component } from 'react';
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";




function Like ({clicked}) {
  

    if(clicked ==false){
    
      return <AiOutlineLike />
    }
    else if(clicked ==true){
      return <AiFillLike />
    }
    else{
      console.log("error rendering like button");
      
    }
}

     
 


export default Like;