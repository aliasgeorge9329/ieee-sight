import { firestore, getUserWithUsername, postToJSON  } from "../../lib/firebase";
import PostContent from '../../components/PostContent/PostContent';
import { useDocumentData } from 'react-firebase-hooks/firestore';

//Incremental Static Regeneration

export async function getStaticProps({ params }){
    const { username, slug } = params;
    const userDoc = await getUserWithUsername(username);

    let post;
    let path;

    if(userDoc){
        const postRef = userDoc.ref.collection('posts').doc(slug);
        post = postToJSON(await postRef.get());

        path = postRef.path; //To refect data from client side to rehydrate the content in realtime
    }

    return{
        props: { post, path },
        revalidate:  5000,
    };
}

//Conditionally rendering specific path
export async function getStaticPaths(){
    const snapshot = await firestore.collectionGroup('posts').get();

    const paths = snapshot.docs.map((doc) => {
        const { slug, username } = doc.data();

        return {
            params: { username, slug },
        };
    });

    return{
        paths,
        fallback: 'blocking', //If the page is not cached, next will rebuild the path passed as props

    }
}


const Post = (props) => {

    const postRef = firestore.doc(props.path);
    const [realtimePost] = useDocumentData(postRef); //Gets a feed of the data in realtime

    const post = realtimePost || props.post;
    return ( 
        <div>
            <section>
                <PostContent post={post} />
            </section>
            <aside style={{float: "right"}}>
                <p>{ post.heartCount || 0 } 👏🏻</p>
            </aside>
        </div>
    );
}
 
export default Post;