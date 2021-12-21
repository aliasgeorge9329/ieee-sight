/* eslint-disable @next/next/no-img-element */

import styles from '../styles/UserProfile.module.css'

export default function UserProfile({ user }) {
	console.log(user)
	return (
		<section className={styles['user-profile-section']}>
			<img className={styles['user-profile-img']} src={user.photoURL} alt='UserImage' />
			<h1>{user.displayName}</h1>
			<p>
				<span>@{user.username}</span>
			</p>
			<p>About : Insert bio here</p>
		</section>
	)
}
