import { auth, firestore,HeartIncrement, HeartDecrement} from "../lib/firebase";

async function addLikeToFirestore(heartedBy, currentUid)
{

    //postRef.collection("heartedBy").doc('wGZJrLIp43lEeAAWsPaZ').get()
    heartedBy.get()
    .then((docSnapshot) => {
        if (docSnapshot.exists== false) {
        heartedBy.onSnapshot((doc) => {
            // do stuff with the data
            heartedBy.set({username : "usr"}) // create the document
        });
        } 
    });
}


async function removeLikeToFirestore(heartedBy, currentUid)
{
    

    heartedBy.get()
    .then((docSnapshot) => {
        if (docSnapshot.exists) {
        heartedBy.onSnapshot((doc) => {
            // do stuff with the data
            heartedBy.delete() // delete the document
        });
    } 

    });
}

export default async function LinkLikeCount(postRef, likePressed)
{
    //console.log(postRef)
    //const thisPost = await postRef.get(); // this  is doc, doc.data() is data
    

    const currentUid = auth.currentUser.uid
    //debugger
    console.log(currentUid)
    const heartedBy = await postRef.collection("heartedBy").doc(currentUid)
    if(likePressed===true)
    {
        addLikeToFirestore(heartedBy, currentUid)
        postRef.update({heartCount:HeartIncrement})     

    }
    else if (likePressed===false)
    {
        removeLikeToFirestore(heartedBy, currentUid)
        postRef.update({heartCount:HeartDecrement})
    }
   
    

    return
}


