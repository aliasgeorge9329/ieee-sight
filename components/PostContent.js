import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.bubble.css'
import CommentItem from './CommentItem'

// extras
import React, { useEffect, useState } from 'react'
import styles from '../styles/PostContent.module.css'
import Share from './Share'
import InfoDots from './InfoDots'
import PostItem from './PostItem'
import PostFeed from './PostFeed'

import LikeButton from './LikeButton'
import AuthCheck from './AuthCheck'
import Link from 'next/dist/client/link'

import { AiOutlineLike } from 'react-icons/ai'

import CommentButton from './CommentButton'
import { useCollection } from 'react-firebase-hooks/firestore'

// sample dummy comment
let sample_comments = [
	{ username: 'john123', content: 'This is such an insightful post!' },
	{ username: 'Joe11', content: 'Wonderful, keep up the great work.' },
]
function removeElementsByClass(className) {
	className = styles[className]
	var elements = document.getElementsByClassName(className)
	while (elements.length > 0) {
		elements[0].parentNode.removeChild(elements[0])
	}
}

const displayLoginPrompt = (e, text) => {
	removeElementsByClass('please-login-container')
	const mainDiv = document.getElementById('main-container')
	const newSubDiv = document.createElement('div')
	newSubDiv.className = styles['please-login-container']
	newSubDiv.innerHTML = `<a href="/auth"> <button>${text}</button></a>`
	mainDiv.appendChild(newSubDiv)

	//const target = `<div className={styles['signup-container']}><Link href="/auth">Please Sign In</Link></div>`
	//debugger
}

let allComments = []
let uid = 0

const PostContent = ({ post, posts, postRef }) => {
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
					<Share />
					<InfoDots />
				</div>

				<div className={styles['content'] + ' blog-margin'}>
					<ReactQuill value={post?.content} readOnly={true} theme={'bubble'} />
				</div>

				<div className='spacerv-sm'></div>
				<div className={styles['comments'] + ' blog-margin'}>
					<h3>Comments</h3>
					<div className='flex align-center'>
						<input id='comment-box' type='text' placeholder='Add a comment' />
						<div className='spacerh-xs'></div>
						<AuthCheck
							fallback={
								<div
									onClick={(e) => {
										displayLoginPrompt(e, 'Please login to Comment')
									}}
								>
									<button id='add-comment-button'>Add Comment</button>
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
