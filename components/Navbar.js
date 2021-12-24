import { useContext, useState } from 'react'
import { UserContext } from '../lib/authContext'
import Link from 'next/link'

import styles from '../styles/Navbar.module.css'

function Navbar() {
	const { user, username } = useContext(UserContext)

	return (
		<nav className={styles['navbar'] + ' margin'}>
			<HamMenu />
			<Link href={'/'} passHref>
				<div className={styles['logo-wrapper'] + ' pointer'}>Interface</div>
			</Link>

			<div className={styles['nav-links-wrapper']}>
				<ul>
					<Link href={'/blog'} passHref>
						<li>Blogs</li>
					</Link>
					<Link href={'/about'} passHref>
						<li>About</li>
					</Link>
					<Link href={'/contact'} passHref>
						<li>Contact</li>
					</Link>
				</ul>
			</div>

			<div className={styles['login-wrapper']}>
				{!username && <Link href='/auth'>Login</Link>}
				{username && (
					<div className={styles['user-cred-wrapper']}>
						<Link href={'/admin'} passHref>
							<p className={styles['write-post']}>
								<span className={styles['new-post-icon'] + ' iconify'} data-icon='bytesize:plus'></span> &nbsp;Post
							</p>
						</Link>
						<Link href={`/${username}`} passHref>
							<div className={styles['avatar'] + ' pointer'} style={{ backgroundImage: `url(${user.photoURL})` }}></div>
						</Link>
					</div>
				)}
			</div>
		</nav>
	)
}

function HamMenu() {
	const [menuOpen, setMenuOpen] = useState(false)
	return (
		<div className={`ham-menu ${menuOpen ? 'menu-opened' : ''}`}>
			<div
				className='burger-container'
				onClick={() => {
					setMenuOpen(!menuOpen)
				}}
			>
				<div id='burger'>
					<div className='bar topBar'></div>
					<div className='bar btmBar'></div>
				</div>
			</div>
			<ul className='menu'>
				<li className='menu-item'>
					<a href='#'>Blogs</a>
				</li>
				<li className='menu-item'>
					<a href='#'>About</a>
				</li>
				<li className='menu-item'>
					<a href='#'>Contact</a>
				</li>
			</ul>
		</div>
	)
}

export default Navbar
