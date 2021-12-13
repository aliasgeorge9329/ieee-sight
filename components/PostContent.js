
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.bubble.css';
import CommentItem from './CommentItem';

// extras
import React ,{useEffect, useState} from 'react';
import styles from '../styles/PostContent.module.css'
import  Like  from './Like';
import  Share  from './Share';
import  InfoDots  from './InfoDots';
import PostItem from './PostItem';


import LikeButton from './LikeButton';
import LikeAuthCheck from './LikeAuthCheck';
import Link from "next/dist/client/link";

// sample dummy comment
let sample_comments = [{username :"john123",content : "This is such an insightful post!" }, {username :"Joe11",content : "Wonderful, keep up the great work." }]

const PostContent = ({ post, posts, postRef }) => {
    const createdAt = typeof post?.createdAt === 'number' ? new Date(post.createdAt) : post.createdAt.toDate();

	

	//clicked variable to handle like and unlike
	// pass true or false according to the state of the like button depeing on the currentUser
	const [LikeClicked, LikeClickedFn] = useState(false);
	//console.log(LikeClicked);

	
	let invert = ()=>{
		LikeClickedFn(!LikeClicked);
		console.log(LikeClicked);
		
	}

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
					<div  >	<LikeAuthCheck><LikeButton postRef={postRef}/></LikeAuthCheck></div> <Share/> <InfoDots/>
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