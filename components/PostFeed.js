import Link from 'next/link'
import styles from '../styles/PostItem.module.css'

//Admin props for editing the post authored by the currently logged in user
export default function PostFeed({ posts, admin }) {
	return (
		<section className="margin">
			<div className="spacer-m"></div>
			<h2>Recent Posts</h2>
			<div className={styles['posts-container']}>{posts ? posts.map((post) => <PostItem post={post} key={post.slug} admin={admin} />) : null}</div>
			<div className="spacer-m"></div>
		</section>
	)
}

function PostItem({ post, admin = false }) {
	//Show the word count in post card.
	const wordCount = post?.content.trim().split(/\s+/g).length
	const minutesToRead = (wordCount / 100 + 1).toFixed(0)

	return (
		<div className={styles['post-container']}>
			<div className={styles['post-wrapper']}>
				<div className={styles['image']}></div>
				<Link href={`/${post.username}`} passHref>
					<a className={styles['author']}>By @{post.username}</a>
				</Link>
				<Link href={`/${post.username}/${post.slug}`} passHref>
					<h3 style={{ cursor: 'pointer' }} className={styles.title}>
						{post.title}
					</h3>
				</Link>
				<p>
					{wordCount} word{wordCount > 1 ? 's' : ''}. {minutesToRead} min read
				</p>
			</div>
		</div>
	)
}
