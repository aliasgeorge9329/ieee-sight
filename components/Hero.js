/* eslint-disable @next/next/no-img-element */
import styles from '../styles/Hero.module.css'

const Hero = (props) => {
	return (
		<header className={styles.header}>
			<div className="margin">
				<h1 className={styles.h1}>
					Interface
					<br />
					Community
				</h1>

				<div className={styles['bottom-content']}>
					<div className={styles['content-wrapper'] + ' margin'}>
						<div className={styles['social-wrapper']}>
							<h3 className={styles['social-title']}>Connect with us</h3>
							<span className={`${styles.icons} iconify`} data-icon="mdi:instagram"></span>
							<span className={`${styles.icons} iconify`} data-icon="mdi:twitter"></span>
							<span className={`${styles.icons} iconify`} data-icon="mdi:linkedin"></span>
						</div>
						<div className={styles['description-wrapper']}>
							<h3 className={styles.description}>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</h3>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Hero
