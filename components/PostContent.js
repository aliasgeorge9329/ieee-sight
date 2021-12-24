import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.bubble.css'
import CommentItem from './CommentItem'
import CommentButton from './CommentButton'
import ShareButton from './ShareButton'
import LikeButton from './LikeButton'
// extras
import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { UserContext } from '../lib/authContext';
import styles from '../styles/PostContent.module.css'
import commentStyles from '../styles/Index.module.css'
import toast from 'react-hot-toast'
import PostFeed from './PostFeed'

import AuthCheck from './AuthCheck'
import Link from 'next/dist/client/link'

import { AiOutlineLike, AiFillDelete } from 'react-icons/ai'

import { useCollection } from 'react-firebase-hooks/firestore'
import removeElementsByClass from '../lib/removeElementsByClassName'
// sample dummy comment
/*
let sample_comments = [
	{ username: 'john123', content: 'This is such an insightful post!' },
	{ username: 'Joe11', content: 'Wonderful, keep up the great work.' },
]
*/


const displayLoginPrompt = (e, text) => {
	removeElementsByClass(styles['please-login-container'])
	const mainDiv = document.getElementById('main-container')
	const newSubDiv = document.createElement('div')
	newSubDiv.className = styles['please-login-container']
	newSubDiv.innerHTML = `<a href="/auth"> <button>${text}</button></a>`
	mainDiv.appendChild(newSubDiv)

	//const target = `<div className={styles['signup-container']}><Link href="/auth">Please Sign In</Link></div>`
	//debugger
}

//To delete the blog updated by the user
function DeletePostButton({ postRef }) {
	const router = useRouter();
  
	const deletePost = async () => {
	  const doIt = confirm('are you sure!');
	  if (doIt) {
		await postRef.delete();
		router.push('/');
		toast('post deleted ', { icon: '🗑️' });
	  }
	};
  
	return (
	  <AiFillDelete onClick={deletePost} />
	);
  }

let allComments = []
let uid = 0

const PostContent = ({ post, posts, postRef }) => {
	const { user: currentUser } = useContext(UserContext);

	const createdAt = typeof post?.createdAt === 'number' ? new Date(post.createdAt) : post.createdAt.toDate()
	
	const [comments, commentsLoading, commentsError] = useCollection(postRef.collection('comments').orderBy('createdAt'))
	
	const [rerender, setRerender] = useState(false)
	
	useEffect(() => {
		if (comments) {
			allComments = []
			comments.forEach((doc) => {
				const commentData = doc.data()
				allComments.push({
					username: commentData.username,
					content: commentData.content,
					uid: commentData.uid,
					commentId: doc.id,
				})
			})
		}
	}, [comments, rerender])

	return (
		<div id='main-container' className={styles['posts-section'] + ' margin'}>
			<div className='nav-spacer'></div>
			<div className='spacerv-sm'></div>
			<div className={styles['posts-container']}>
				<div className='flex-center flex-col text-center'>
					<div className={styles['heading']}>
						<Link href={`/${post.username}/${post.slug}`} passHref>
							<h2 style={{ cursor: 'pointer' }}>{post.title}</h2>
						</Link>
					</div>
					<div className={styles['mini-description']}>Add Mini description here</div>
					<div className={styles['post-wrapper']}>
						By &nbsp;
						<Link href={`/${post.username}`} passHref>
							<a className={styles['author']}>@{post.username}</a>
						</Link>{' '}
						&nbsp; on {createdAt.toDateString()}
					</div>
					<div className={styles['icons']}>
						<div className={styles['like-icon'] + ' pointer'}>
							<AuthCheck
								fallback={
									<div
										onClick={(e) => {
											displayLoginPrompt(e, 'Please login to Like')
										}}
									>
										<AiOutlineLike />
									</div>
								}
							>
								<LikeButton postRef={postRef} />
							</AuthCheck>
						</div>
						<div className={styles['like-count']}>{post.likeCount}</div>
						<ShareButton />
						{currentUser?.uid === post.uid && (
							<DeletePostButton postRef={postRef}/>
						)}
					</div>
				</div>

				<div className={styles['content'] + ' blog-margin'}>
					<ReactQuill value={post?.content} readOnly={true} theme={'bubble'} />
				</div>

				<div className='spacerv-sm'></div>
				<div className={styles['comments'] + ' blog-margin'}>
					<h3>Comments</h3>
					<div className={commentStyles['create-post']}>
						<input id='comment-box' type='text' placeholder='Add a comment' />
						<AuthCheck
							fallback={
								<div
									onClick={(e) => {
										displayLoginPrompt(e, 'Please login to Comment')
									}}
								>
									<button id='add-comment-button'>Comment</button>
								</div>
							}
						>
							<CommentButton postRef={postRef} rerender={{ rerender: rerender, setRerender: setRerender }} />
						</AuthCheck>
					</div>
					<div id='all-comments-container'>
						{allComments
							? allComments.map((comment) => (
									<CommentItem
										key={uid++}
										comment={comment}
										postRef={postRef}
										rerender={{ rerender: rerender, setRerender: setRerender }}
									/>
							  ))
							: ``}
					</div>
				</div>
				<div className='spacerv-sm'></div>
			</div>

			<div className='spacerv-sm'></div>
			<PostFeed title='More posts' posts={posts} admin={false} />
			<div className='spacerv-md'></div>
		</div>
	)
}
// comments need : uid, username, content, createdAt,
export default PostContent
