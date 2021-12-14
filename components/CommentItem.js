
import Link from 'next/link';
import styles from '../styles/CommentItem.module.css'
import {firestore, auth} from '../lib/firebase'
import {AiOutlineDelete} from 'react-icons/ai'

function DeleteComment({comment, postRef})
{
	const del = async ()=>{
		const batch = firestore.batch();

        batch.delete(postRef.collection('comments').doc(comment.commentId));

        await batch.commit();

	}
	return (
	
	<div onClick={(e)=>{
		
		console.log("going to delete comment")
		del()
		const currentComment = document.getElementById(comment.commentId)
		currentComment.parentNode.removeChild(currentComment)
		

	}}> <AiOutlineDelete/> </div>
	)
}
function CommentItem({ comment, postRef }) {
	const uid = auth.currentUser? auth.currentUser.uid:null
	return (
		<div id = {comment.commentId} className={styles['comment-container']}>
			<div className={styles['comment-wrapper']}>

				<Link href={`/${comment.username}`} passHref>
					<a className={styles['author']}>@{comment.username}</a>
				</Link>
				<div >{(uid===comment.uid)? <DeleteComment comment = {comment} postRef={postRef}/>:``}</div>
				<p className={styles['comment-content']}>{comment.content}</p>
			</div>
		</div>
	)
}

export default CommentItem;