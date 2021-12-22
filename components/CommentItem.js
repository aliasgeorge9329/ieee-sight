import Link from 'next/link'
import styles from '../styles/CommentItem.module.css'
import { firestore, auth } from '../lib/firebase'
import { AiOutlineDelete } from 'react-icons/ai'

function DeleteComment({ comment, postRef, rerender }) {
	const del = async (e) => {
		e.currentTarget.onClick = () => {
			return
		}
		//const currentComment = document.getElementById(comment.commentId)
		//currentComment.parentNode.removeChild(currentComment)
		const batch = firestore.batch()
		batch.delete(postRef.collection('comments').doc(comment.commentId))
		console.log('going to delete comment')
		await batch.commit()
		rerender.setRerender(!rerender.rerender)
	}
	return (
		<div onClick={del}>
			{' '}
			<AiOutlineDelete />{' '}
		</div>
	)
}
function CommentItem({ comment, postRef, rerender }) {
	const uid = auth.currentUser ? auth.currentUser.uid : null
	return (
		<div id={comment.commentId} className={styles['comment-container']}>
			<div className={styles['comment-wrapper']}>
				<div className='flex align-center'>
					<Link href={`/${comment.username}`} passHref>
						<a className={styles['author']}>@{comment.username}</a>
					</Link>
					<div className='spacerh-xs'></div>
					<div className='pointer'>
						{uid === comment.uid ? <DeleteComment comment={comment} postRef={postRef} rerender={rerender} /> : ``}
					</div>
				</div>
				<p className={styles['comment-content']}>{comment.content}</p>
			</div>
		</div>
	)
}

export default CommentItem
