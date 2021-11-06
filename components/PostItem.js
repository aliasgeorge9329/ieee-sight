import React ,{useState} from 'react';
import styles from '../styles/PostItem.module.css'
import  Like  from './Like';
import  Comment  from './Comment';
import  Share  from './Share';
import Link from 'next/link'

function PostItem({ post, admin = false }) {
	//clicked variable to handle like and unlike
	const [LikeClicked, LikeClickedFn] = useState(false);
	let invert = ()=>{
		LikeClickedFn(!LikeClicked);
		console.log(LikeClicked);
		
	}

	//Show the word count in post card.
	const wordCount = post?.content.trim().split(/\s+/g).length
	const minutesToRead = (wordCount / 100 + 1).toFixed(0)

	return (
		<div className={styles['post-container']}>
			<div className={styles['post-wrapper']}>
				<div className={styles['image']}></div>

                <p className={styles['post-info']}>
                    <Link href={`/${post.username}`} passHref>
                        <a className={styles['author']}>@{post.username}</a>
                        
                    </Link>
                    &nbsp;  {wordCount} word{wordCount > 1 ? 's' : ''} — {minutesToRead} min read
					
				</p>
				<Link href={`/${post.username}/${post.slug}`} passHref>
					<h3 style={{ cursor: 'pointer' }} className={styles.title}>
						{post.title}
					</h3>
				</Link>
				
				<div className = {styles['icons']}>
					<div onClick={invert}>	<Like  clicked = {LikeClicked}  />  </div> <Comment/> <Share/>
				</div>
				
			</div>
		</div>
	)
}

export default PostItem;

