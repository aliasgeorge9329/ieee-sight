/* eslint-disable @next/next/no-img-element */
import styles from "../styles/Hero.module.css";

const Hero = (props) => {
  return (
    <header className={styles.header}>
      <div className={styles["bg-image"]}></div>
      <h1 className={styles.h1 + " margin"}>
        IEEE
        <br />
        SIGHT
        <p className={styles["desc"]}>
          Special interest group on humanitarian technology.
        </p>
      </h1>

      <div className={styles["bottom-content"] + " margin"}>
        <div className={styles["content-wrapper"]}>
          <div className={styles["social-wrapper"]}>
            <p className={styles["social-title"]}>Connect with us</p>
            <span
              className={`${styles.icons} iconify`}
              data-icon="mdi:instagram"
            ></span>
            <span
              className={`${styles.icons} iconify`}
              data-icon="mdi:twitter"
            ></span>
            <span
              className={`${styles.icons} iconify`}
              data-icon="mdi:linkedin"
            ></span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
