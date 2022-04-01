import { Image } from "@chakra-ui/react";
import React from "react";
import styles from "../styles/HeaderImages.module.css";

export default function HeaderImages() {
  return (
    <>
      <div className={styles.center}>
        <Image src="/ieeesight.png" className={styles.img1} />
        <Image src="/ieeekerala.png" className={styles.img2} />
        <Image src="/ieee.jpeg" className={styles.img3} />
      </div>
    </>
  );
}
