/* eslint-disable @next/next/no-img-element */

import styles from '../styles/UserProfile.module.css'

export default function UserProfile({ user }){
    return(
        <section className={styles['user-profile-section']}>
            <img className={styles['user-profile-img']} src={user.photoURL} alt="UserImage" />
            <p><span>@{user.username}</span></p>
            <h1>{user.displayName}</h1>
        </section>
    );
}