import {auth } from  "../lib/firebase";


export default async function AlreadyLiked(postRef)
{
    
     
    //const currentUid = 1//auth.currentUser.uid;
    // need to get current user id here 
    const heartedBy = await postRef.collection("heartedBy").doc(currentUid)
    let response 
     await heartedBy.get()
    .then((docSnapshot) => {
        if (docSnapshot.exists) {
        heartedBy.onSnapshot((doc) => {
            // do stuff with the data
            response = JSON.stringify(true)
             
        });
    } 
    else {
            response= JSON.stringify(false)
            
        }
    });
    return {
        props :{
        response : 1
        }
    } 

}