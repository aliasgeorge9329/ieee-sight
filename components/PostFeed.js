import PostItem from './PostItem'
import styles from '../styles/PostItem.module.css'

//Admin props for editing the post authored by the currently logged in user
export default function PostFeed({ title, posts, admin }) {
	return (
		<section className={styles['posts-section']}>
			<h2>{title || 'Recent Posts'}</h2>
			<div className={styles['posts-container']}>
				{posts ? posts.map((post) => <PostItem post={post} key={post.slug} admin={admin} />) : null}
			</div>
		</section>
	)
}
/*

function PostItem({ post, admin = false }) {
	//Show the word count in post card.
	const wordCount = post?.content.trim().split(/\s+/g).length
	const minutesToRead = (wordCount / 100 + 1).toFixed(0)

	return (
		<div className={styles['post-container']}>
			<div className={styles['post-wrapper']}>
				<div className={styles['image']}></div>
				<Link href={`/${post.username}`} passHref>
					<a className={styles['author']}>@{post.username}</a>
				</Link>
				<Link href={`/${post.username}/${post.slug}`} passHref>
					<h3 style={{ cursor: 'pointer' }} className={styles.title}>
						{post.title}
					</h3>
				</Link>
				<p className={styles['post-info']}>
					{wordCount} word{wordCount > 1 ? 's' : ''} — {minutesToRead} min read
					
				</p>
				<div className = {styles['icons']}>
					<Like/> <Comment/> <Share/>
				</div>
				
			</div>
		</div>
	)
}
*/
