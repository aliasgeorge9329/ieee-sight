import { Image } from "@chakra-ui/react";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styles from "../styles/CarouselCard.module.css";
export default function CarouselCard() {
  return (
    <Carousel
      showArrows={true}
      autoPlay={true}
      dynamicHeight={true}
      showThumbs={false}
    >
      <div>
        <Image src="/slideshow/1.png" className={styles.img} />
        <p className="legend">Site Visit</p>
      </div>
      <div>
        <Image src="/slideshow/2.png" className={styles.img} />
        <p className="legend">Site Visit</p>
      </div>
      <div>
        <Image src="/slideshow/3.png" className={styles.img} />
        <p className="legend">Site Visit</p>
      </div>
      <div>
        <Image src="/slideshow/4.png" className={styles.img} />
        <p className="legend">Site Visit</p>
      </div>
      <div>
        <Image src="/slideshow/5.png" className={styles.img} />
        <p className="legend">Site Visit</p>
      </div>
      <div>
        <Image src="/slideshow/6.png" className={styles.img} />
        <p className="legend">Project</p>
      </div>
      <div>
        <Image src="/slideshow/7.png" className={styles.img} />
        <p className="legend">Project</p>
      </div>
    </Carousel>
  );
}
