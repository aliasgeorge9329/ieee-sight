import Hero from "../components/Hero";

import { useState } from "react";
import { firestore, fromMillis, postToJSON } from "../lib/firebase";

// Max post to query per page
const LIMIT = 4;

export async function getServerSideProps(context) {
  const postsQuery = firestore
    .collectionGroup("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  // Get next page in pagination query
  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor =
      typeof last.createdAt === "number"
        ? fromMillis(last.createdAt)
        : last.createdAt;

    const query = firestore
      .collectionGroup("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .startAfter(cursor)
      .limit(LIMIT);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <div className="body">
      <Hero />
      <div className="margin">
        <div className="about">
          <h1>About Us</h1>
          <br />
          <h3>Mission</h3>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            eligendi fugit doloremque alias fuga illo molestias, sapiente, nam
            aperiam hic cum optio deleniti repudiandae ut consequuntur officia
            exercitationem saepe laudantium.
          </p>
          <br />
          <h3>Vision</h3>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            eligendi fugit doloremque alias fuga illo molestias, sapiente, nam
            aperiam hic cum optio deleniti repudiandae ut consequuntur officia
            exercitationem saepe laudantium.
          </p>
          <div className="margin"></div>
        </div>
      </div>
    </div>
  );
}
