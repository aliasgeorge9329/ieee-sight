import { auth, firestore, getUidFromUsername ,getUserWithUsername, postToJSON } from "../../lib/firebase";
import AuthCheck from "../../components/AuthCheck";
import { useCollection } from "react-firebase-hooks/firestore";

import router from "next/router";
import { useRouter } from "next/router";
import UserProfile from "../../components/UserProfile";
import PostFeed from "../../components/PostFeed";

export async function getServerSideProps({ query }) {
  const { username } = query;

  const userDoc = await getUserWithUsername(username);
  const PostUserUid = await getUidFromUsername(username);
  

  if (!userDoc) {
    return {  
      notFound: true,
    };
  }

  let user = null;
  let posts = null;
  

  if (userDoc) {

    user = userDoc.data();

    
    const postsQuery = userDoc.ref
      .collection("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .limit(5);

    posts = (await postsQuery.get()).docs.map(postToJSON);
  }

  return {
    props: { user, posts, PostUserUid },
  };
}



const signOut = () => {
      
      auth.signOut();
      router.reload();
  }



  function PostList() {
    const ref = firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("posts");
    const query = ref.orderBy("createdAt");
    const [querySnapshot] = useCollection(query); //react-firebase-hook gets relatime data
  
    const posts = querySnapshot?.docs.map((doc) => doc.data());
  
    return <PostFeed title="Your posts" posts={posts} admin />;
  }
  
export default function UserProfilePage({ user, posts , PostUserUid}) 
{
  const router = useRouter();
  const currentUser = auth.currentUser
    
  
  return (
    <main id="main-container" className="margin">
      <div className="nav-spacer"></div>
      <div className="spacerv-sm"></div>
      <UserProfile user={user} />
      <div className="spacerv-sm"></div>
      
        {
          (currentUser?.uid ===  PostUserUid.uid) && <button
            onClick={
                () => {
              signOut()
            }
          }
          >
            Logout
          </button> &&
          <PostList/>
        }
      
      <PostFeed posts={posts} />
      <div className="spacerv-md"></div>
    </main>
  );
}
