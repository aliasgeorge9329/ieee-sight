import styles from "../styles/PostItem.module.css";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import ShareButton from "./ShareButton";
import Link from "next/link";
import { Image } from "@chakra-ui/react";
function PostItem({ post, admin = false }) {
  function image(a) {
    var parser = require("node-html-parser");
    var html = a;
    var img = parser.parse(html).querySelector("img")?.getAttribute("src");
    return img;
  }

  //Show the word count in post card.
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);
  return (
    <div className={styles["post-container"]}>
      <div className={styles["post-wrapper"]}>
        <div className={styles["image"]}>
          <Link href={`/${post.username}/${post.slug}`} passHref>
            <Image
              style={{ cursor: "pointer" }}
              src={image(post.content)}
              className={image(post.content) ? styles["img"] : ""}
            />
          </Link>
        </div>

        <p className={styles["post-info"]}>
          <Link href={`/${post.username}`} passHref>
            <a className={styles["author"]}>@{post.username}</a>
          </Link>
          &nbsp; {wordCount} word{wordCount > 1 ? "s" : ""} — {minutesToRead}{" "}
          min read
        </p>
        <Link href={`/${post.username}/${post.slug}`} passHref>
          <h3 style={{ cursor: "pointer" }} className={styles.title}>
            {post.title}
          </h3>
        </Link>

        <div className={styles["icons"]}>
          <div className="flex align-center pointer">
            <BsSuitHeart />
            <div className="spacerh-xs"></div>
            {post.likeCount}
          </div>
          <div className="spacerh-sm"></div>
          <ShareButton link={`/${post.username}/${post.slug}`} />
        </div>
      </div>
    </div>
  );
}

export default PostItem;
