import { firestore, auth, increment } from '../lib/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';


export default function Comment({postRef, rerender}) {
    
    
    const uid = auth.currentUser.uid;
    const username = auth.currentUser.username
    const commentRef = postRef.collection('comments').doc()
    const userRef = firestore.collection('users').doc(uid)
    //const [commentDoc] = useDocument(commentRef);
    
    
    const addComment = async () => {
        const content = document.getElementById('comment-box').value
        if (content.length!=0)
        {
            const userDoc  = await userRef.get()
            const batch = firestore.batch();

            batch.set(postRef.collection('comments').doc(), 
            { 
                username :  userDoc.data().username,
                uid: uid,
                content: content,
                createdAt: new Date(),
             
            });
            //batch.set(commentRef, { uid });
            
            await batch.commit();
            rerender.setRerender(!rerender.rerender)
        }
        
    }


    return(
        <button onClick={(e)=>{addComment()}}>Add Comment</button>
    )

    /*
    const deleteComment = async () => {
        const batch = firestore.batch();

        batch.update(postRef, { likeCount: increment(-1) });
        batch.delete(likeRef);

        await batch.commit();
    };

    return likeDoc?.exists ? (
        <div onClick={unlike}><AiFillLike /> </div> 
        ) : (
        <div onClick={like}><AiOutlineLike />  </div>
    );
    */
   
    
}