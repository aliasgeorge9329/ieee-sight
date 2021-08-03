import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {

    apiKey: "AIzaSyAQ5e9FRLmhGcQ15gq_Zx32_nn7GiYW7GA",
    authDomain: "fir-blog-8a1ec.firebaseapp.com",
    projectId: "fir-blog-8a1ec",
    storageBucket: "fir-blog-8a1ec.appspot.com",
    messagingSenderId: "661285886374",
    appId: "1:661285886374:web:b7b53e7f474c282df49767"
  
};

//Firebase only initiallizes the app once. But NEXT can run the code twice during development and hence amy throw error
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
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
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;  //Returns the progress of the file upload


//Helper Function to get the UserDocs of a particular user
export async function getUserWithUsername(username) {
    const usersRef = firestore.collection('users');
    const query = usersRef.where('username', '==', username).limit(1);
    const userDoc = (await query.get()).docs[0];
    
    return userDoc;
  }

//Timestamp has to converted to JSON
export function postToJSON(doc){
    const data = doc.data();

    return{
        ...data,
        createdAt: data?.createdAt.toMillis() || 0,
        updatedAt: data?.updatedAt.toMillis() || 0,
    };
}