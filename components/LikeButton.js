import { firestore, auth, increment } from '../lib/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';

export default function Like({ postRef }) {
    const likeRef = postRef.collection('likes').doc(auth.currentUser.uid);
    const [likeDoc] = useDocument(likeRef);


    const like = async () => {
        const uid = auth.currentUser.uid;
        const batch = firestore.batch();

        batch.update(postRef, { likeCount: increment(1) });
        batch.set(likeRef, { uid :uid });
        
        await batch.commit();
    }

    const unlike = async () => {
        const batch = firestore.batch();

        batch.update(postRef, { likeCount: increment(-1) });
        batch.delete(likeRef);

        await batch.commit();
    };

    return likeDoc?.exists? (
        <div onClick={unlike}><AiFillLike /> </div> 
        ) : (
        <div onClick={like}><AiOutlineLike />  </div>
    );
    
}