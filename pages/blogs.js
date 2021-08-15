import PostFeed from '../components/PostFeed'
import Loader from '../components/Loader'
import { firestore, postToJSON } from '../lib/firebase'

const LIMIT = 10

export async function getServerSideProps(context) {
	const postsQuery = firestore.collectionGroup('posts').where('publlished', '==', true).orderBy('createdAt', 'desc').limit(LIMIT)

	const post = (await postsQuery.get()).docs.map(postToJSON)

	return {
		props: { posts },
	}
}

export default function BlogPage(prosp) {
	const [posts, setPosts] = useState(props.posts)
	const [loading, setLoading] = useState(false)

	const [postsEnd, setPostsEnd] = useState(false)
}
