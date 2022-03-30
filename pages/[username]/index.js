import { auth, getUserWithUsername, postToJSON } from "../../lib/firebase";
import AuthCheck from "../../components/AuthCheck";

import router from "next/router";
import { useRouter } from "next/router";
import UserProfile from "../../components/UserProfile";
import PostFeed from "../../components/PostFeed";
export async function getServerSideProps({ query }) {
  const { username } = query;

  const userDoc = await getUserWithUsername(username);

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
    props: { user, posts },
  };
}



const signOut = () => {
      auth.signOut();
      router.reload();
  }

export default function UserProfilePage({ user, posts }) {
  const router = useRouter();
  return (
    <main id="main-container" className="margin">
      <div className="nav-spacer"></div>
      <div className="spacerv-sm"></div>
      <UserProfile user={user} />
      <div className="spacerv-sm"></div>
      <AuthCheck>
        <button
          onClick={() => {
            signOut()
          }}
        >
          Logout
        </button>
      </AuthCheck>
      <PostFeed posts={posts} />
      <div className="spacerv-md"></div>
    </main>
  );
}
