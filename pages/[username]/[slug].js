import {  firestore, getUserWithUsername, postToJSON } from '../../lib/firebase'
import PostContent from '../../components/PostContent'
import { useDocumentData } from 'react-firebase-hooks/firestore'
//Incremental Static Regeneration

export async function getStaticProps({ params }) {
	const { username, slug } = params
	const userDoc = await getUserWithUsername(username)

	let posts
	let post
	let path
	let user

	if (userDoc) {
		const postRef = userDoc.ref.collection('posts').doc(slug)
		post = postToJSON(await postRef.get())

		path = postRef.path //To refect data from client side to rehydrate the content in realtime

		// Getting posts also to display on suggestions
		user = userDoc.data()
		const postsQuery = userDoc.ref.collection('posts').where('published', '==', true).orderBy('createdAt', 'desc').limit(3)

		posts = (await postsQuery.get()).docs.map(postToJSON)

		// liked = await AlreadyLiked(postRef)
	}

	return {
		props: { post, path, posts, user },
		revalidate: 5000,
	}
}

//Conditionally rendering specific path
export async function getStaticPaths() {
	const snapshot = await firestore.collectionGroup('posts').get()

	const paths = snapshot.docs.map((doc) => {
		const { slug, username } = doc.data()

		return {
			params: { username, slug },
		}
	})

	return {
		paths,
		fallback: 'blocking', //If the page is not cached, next will rebuild the path passed as props
	}
}

const Post = (props) => {
	
	const postRef = firestore.doc(props.path)
	const [realtimePost] = useDocumentData(postRef) //Gets a feed of the data in realtime

	const post = realtimePost || props.post
	const posts = props.posts

	// refernce the post to the UI so increment decrement hearts/ Likes

	return (
		<div>
			<PostContent post={post} posts={posts} postRef={postRef} />
		</div>
	)
}

export default Post
