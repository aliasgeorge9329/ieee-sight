import { firestore, auth, increment } from '../lib/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';

export default function Comment({ postRef, text }) {


    const likeRef = postRef.collection('comments').doc()
    const [likeDoc] = useDocument(likeRef);


    const addComment = async () => {
        const uid = auth.currentUser.uid;
        const batch = firestore.batch();

        batch.update(postRef.collection('comments').doc(), 
        { 
            uid: uid,
            content: text,
            createdAt: new Date(),
        });
        batch.set(likeRef, { uid });
        
        await batch.commit();
    }

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
    
}