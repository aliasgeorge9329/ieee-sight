import AuthCheck from '../../components/AuthCheck'
import { auth, firestore, serverTimestamp } from '../../lib/firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import PostFeed from '../../components/PostFeed'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { UserContext } from '../../lib/authContext'
import kebabCase from 'lodash.kebabcase'
import toast from 'react-hot-toast'
import styles from '../../styles/Index.module.css'

const AdminPage = () => {
	return (
		<div className='margin'>
			<div className='nav-spacer'></div>
			<div className='spacerv-sm'></div>
			<AuthCheck>
				<CreateNewPost />
				<div className='spacerv-md'></div>
				<PostList />
			</AuthCheck>
			<div className='spacerv-md'></div>
		</div>
	)
}

export default AdminPage

function PostList() {
	const ref = firestore.collection('users').doc(auth.currentUser.uid).collection('posts')
	const query = ref.orderBy('createdAt')
	const [querySnapshot] = useCollection(query) //react-firebase-hook gets relatime data

	const posts = querySnapshot?.docs.map((doc) => doc.data())

	return <PostFeed title='Your posts' posts={posts} admin />
}

function CreateNewPost() {
	const router = useRouter()
	const { username } = useContext(UserContext)

	const [title, setTitle] = useState('')

	//For URL
	const slug = encodeURI(kebabCase(title))
	const isValid = title.length > 3 && title.length < 50

	async function createPost(e) {
		e.preventDefault()
		const uid = auth.currentUser.uid
		const ref = firestore.collection('users').doc(uid).collection('posts').doc(slug)

		const data = {
			title,
			slug,
			uid,
			username,
			published: false,
			content: '# hello world!',
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
			likeCount: 0,
		}

		await ref.set(data)
		toast.success('Post Created 🥳')

		router.push(`/admin/${slug}`)
	}

	return (
		<div>
			<h2>Create post</h2>
			<form onSubmit={createPost} className={styles['create-post']}>
				<input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Blog Title' />
				<button type='submit' disabled={!isValid}>
					Create Post
				</button>
			</form>
		</div>
	)
}
