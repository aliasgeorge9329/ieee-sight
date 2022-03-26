import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

//Firebase only initiallizes the app once. But NEXT can run the code twice during development and hence amy throw error
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

//Authentication
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

//Firestore
export const firestore = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const increment = firebase.firestore.FieldValue.increment;

//Storage
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED; //Returns the progress of the file upload

//Heart/Like count increment/decrement
export const HeartIncrement = firebase.firestore.FieldValue.increment(1);
export const HeartDecrement = firebase.firestore.FieldValue.increment(-1);

//Helper Function to get the UserDocs of a particular user
export async function getUserWithUsername(username) {
  const usersRef = firestore.collection("users");
  const query = usersRef.where("username", "==", username).limit(1);
  const userDoc = (await query.get()).docs[0];

  return userDoc;
}

//Timestamp has to converted to JSON
export function postToJSON(doc) {
  const data = doc.data();

  return {
    ...data,
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}
