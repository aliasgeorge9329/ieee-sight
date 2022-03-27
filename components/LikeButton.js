import { firestore, auth, increment } from "../lib/firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";

export default function Like({ postRef }) {
  const likeRef = postRef.collection("likes").doc(auth.currentUser.uid);
  const [likeDoc] = useDocument(likeRef);

  const like = async () => {
    const uid = auth.currentUser.uid;
    const batch = firestore.batch();

    batch.update(postRef, { likeCount: increment(1) });
    batch.set(likeRef, { uid: uid });

    await batch.commit();
  };

  const unlike = async () => {
    const batch = firestore.batch();

    batch.update(postRef, { likeCount: increment(-1) });
    batch.delete(likeRef);

    await batch.commit();
  };

  return likeDoc?.exists ? (
    <div onClick={unlike}>
      <BsSuitHeartFill />{" "}
    </div>
  ) : (
    <div onClick={like}>
      <BsSuitHeart />{" "}
    </div>
  );
}
