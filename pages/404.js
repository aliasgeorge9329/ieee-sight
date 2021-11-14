import Link from 'next/link';
import styles from '../styles/404.module.css';
export default function Custom404() {
  return (
    <main>
      <div className={styles["container-404"]}>
        <div className={styles['title-404']}>
          <h1>It&apos;s 404 baby😏</h1>
        </div>
        <iframe
          src="https://giphy.com/embed/5nmobhwPiNsKELWk69"
          width="480"
          height="362"
          frameBorder="0"
          allowFullScreen
        ></iframe>
        <div className={styles['go-home-404']}>
          <Link href="/" passHref>
            <button>Go home</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
