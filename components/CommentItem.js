
import Link from 'next/link';
import styles from '../styles/CommentItem.module.css'
function CommentItem({ comment }) {
	return (
		<div className={styles['comment-container']}>
			<div className={styles['comment-wrapper']}>

				<Link href={`/${comment.username}`} passHref>
					<a className={styles['author']}>@{comment.username}</a>
				</Link>
				<p className={styles['comment-content']}>{comment.content}</p>
			</div>
		</div>
	)
}

export default CommentItem;