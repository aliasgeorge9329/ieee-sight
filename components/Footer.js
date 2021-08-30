import Link from 'next/link'
import styles from '../styles/Footer.module.css'

export default function Footer() {
	return (
		<footer className={styles.footer + ' ' + 'margin'}>
			<div className={styles.top}>
				<div className={styles.line}></div>
				<h2 className={styles.logo}>Interface</h2>
				<div className={styles.line}></div>
			</div>
			<div className={styles.bottom}>
				<div className={styles.left}>
					<Link href="/blogs">
						<a>Blogs</a>
					</Link>
					<Link href="/aboutus">
						<a>About Us</a>
					</Link>
				</div>
				<div className={styles.middle}>
					<div className={styles['icons-wrapper']}>
						<span className={`${styles.icons} iconify`} data-icon="mdi:instagram"></span>
						<span className={`${styles.icons} iconify`} data-icon="mdi:twitter"></span>
						<span className={`${styles.icons} iconify`} data-icon="mdi:linkedin"></span>
					</div>
					<p className={styles.newsletter}>NEWSLETTER</p>
					<p className={styles.email}>name@example.com</p>
					<button className={styles.subscribe}>SUBSCRIBE</button>
					<p className={styles.copyright}>&#169; 2021</p>
				</div>
				<div className={styles['bottom-links']}>
					<Link href="/blogs">
						<a>Blogs</a>
					</Link>
					<Link href="/aboutus">
						<a>About Us</a>
					</Link>
					<Link href="/ourteam">
						<a>Our Team</a>
					</Link>
					<Link href="/email">
						<a>Email Us</a>
					</Link>
				</div>
				<div className={styles.right}>
					<Link href="/ourteam">
						<a>Our Team</a>
					</Link>
					<Link href="/email">
						<a>Email Us</a>
					</Link>
				</div>
			</div>
		</footer>
	)
}
