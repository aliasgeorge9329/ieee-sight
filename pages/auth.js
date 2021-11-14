import { auth, firestore, googleAuthProvider } from "../lib/firebase";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../lib/authContext";
import debounce from "lodash.debounce";
import { useRouter } from "next/dist/client/router";
import styles from "../styles/Auth.module.css"

export default function Enter(props) {
    const { user , username } = useContext(UserContext);
    
    return ( 
        <>
             <div className={styles['login-form']}>
            {
                user ? 
                    !username ? <UsernameForm /> : <SignOutButton />
                    :
                    <SignInButton />
            }
            </div>
        </>
    );
}

function SignInButton(){
    const signInWithGoogle = async () => {
        await auth.signInWithPopup(googleAuthProvider);
    };

    return(
       
        <div className={styles["sign-in-with-google"]}>
            <button onClick= {signInWithGoogle}>Sign in with Google</button>
        </div>
    );
}


function SignOutButton(){

    const router = useRouter();

    const signOut = () => {
        auth.signOut();
        router.reload();
    }
    return (
        <button onClick={signOut}>Sign Out</button>
    );

}

function UsernameForm(){
    const [formValue, setFormValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const { user, username } = useContext(UserContext);

    const onSubmit = async (e) => {
        e.preventDefault();
        
        const userDoc = firestore.doc(`users/${user.uid}`);
        const usernameDoc = firestore.doc(`usernames/${formValue}`);

        const batch = firestore.batch();
        batch.set(userDoc, {
            username: formValue,
            photoURL: user.photoURL,
            displayName: user.displayName
        });
        batch.set(usernameDoc, { uid: user.uid});

        await batch.commit(); 
    };

    const onChanged = (e) => {
        const val = e.target.value.toLowerCase();
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

        if(val.length < 3){
            setFormValue(val);
            setLoading(false);
            setIsValid(false);
        }
        if(re.test(val)){
            setFormValue(val);
            setLoading(true);
            setIsValid(false);
        }
    };

    useEffect(() => {
        checkUsername(formValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[formValue]);


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const checkUsername = useCallback(
        debounce( async (username) => {
            if(username.length >= 3){
                const ref = firestore.doc(`usernames/${username}`);
                const {exists} = await ref.get();
                console.log('Firebase Read Executed!');
                setIsValid(!exists);
                setLoading(false);
            }
        }, 500),
        []
    );

    return(
        !username && (
            <section>
                <h3>Check For Username</h3>
                <form onSubmit={onSubmit}> 

                    <input name="username" placeholder="username" value={formValue} onChange={onChanged} />
                    <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
                    <button type="submit" disabled={!isValid}>Add Username</button>

                    <h3>States</h3>
                    <div>
                        Username        : {formValue} <br/>
                        Loading         : {loading.toString()} <br/>
                        Username Valid  : {isValid.toString()}   
                    </div>
                </form>
            </section>
        )
    );
}

function UsernameMessage({ username, isValid, loading}) {
    if(loading){
        return <p>Checking....</p>
    }
    else if(isValid){
        return <p>{username} is Available</p>
    }
    else if(username && !isValid){
        return <p>Username is taken !</p>
    }
    else{
        return <p>Unknown Error</p>
    }
}