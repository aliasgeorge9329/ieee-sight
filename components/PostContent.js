import Link from 'next/link';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.bubble.css';
import CommentItem from './CommentItem';

// extras
import styles from '../styles/PostContent.module.css'
import  Like  from './Like';
import  Comment  from './Comment';
import  Share  from './Share';
import  InfoDots  from './InfoDots';
import PostItem from './PostItem';

// sample dummy comment
let sample_comments = [{username :"john123",content : "This is such an insightful post!" }, {username :"Joe11",content : "Wonderful, keep up the great work." }]

const PostContent = ({ post, posts }) => {
    const createdAt = typeof post?.createdAt === 'number' ? new Date(post.createdAt) : post.createdAt.toDate();

    return (
		<div className={styles['posts-section']}>
			<div className={styles['posts-container']}>

				<div className={styles["heading"]}>

					<Link href={`/${post.username}/${post.slug}`} passHref>
							<h3 style={{ cursor: 'pointer' }} >
								{post.title}
							</h3>
					</Link>
				</div>
				<div className={styles['mini-description']}>
					Add Mini description here
				</div>
				<div className={styles['post-wrapper']}>
					By &nbsp;
					<Link href={`/${post.username}`} passHref>
						<a className={styles['author']}>@{post.username}</a>
					</Link> &nbsp;
					
					on {createdAt.toDateString()}


				</div>
				<div className = {styles['icons']}>
					<Like clicked = {true}  /> <Share/> <InfoDots/>
				</div>
				
				<div className= {styles['content']}>

					<ReactQuill value={post?.content} readOnly={true} theme={"bubble"} />	

				</div>

				<div className={styles['comments']}>
					<h3>Comments</h3>
					<div>{sample_comments ? sample_comments.map((comment) => <CommentItem comment={comment}  />) : null}</div>

				</div>

			</div>

			
			<div>
			<div className={styles['cards-container']}>{posts ? posts.map((post) => <PostItem post={post}  />) : null}</div>
				
			</div>


		</div>


        /*
        <div>
            <h1>{post?.title}</h1>
            <span>
                Authored by
                <Link href={`/${post.username}/`} passHref>
                    <a>@{post.username}</a>
                </Link>
                {createdAt.toISOString()}
            </span>
            <ReactQuill value={post?.content}
                readOnly={true} theme={"bubble"} />
        </div>
        */
    );
}

export default PostContent;



//Admin props for editing the post authored by the currently logged in user
function PostFeed({ posts, admin }) {
	return (
		<section className={styles['posts-section'] + ' margin'}>
			<div className="spacer-m"></div>
			<h2>Recent Posts</h2>
			<div className={styles['posts-container']}>{posts ? posts.map((post) => <PostItem post={post} key={post.slug} admin={admin} />) : null}</div>
			<div className="spacer-m"></div>
		</section>
	)
}
/*
function PostItem({ post }) {
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
				
				
			</div>
		</div>
	)
}
*/