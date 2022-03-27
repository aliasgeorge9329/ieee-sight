import { useContext, useState } from "react";
import { UserContext } from "../lib/authContext";
import Link from "next/link";

import styles from "../styles/Navbar.module.css";

function Navbar() {
  const { user, username } = useContext(UserContext);

  return (
    <nav className={styles["navbar"] + " margin"}>
      <HamMenu />
      <Link href={"/"} passHref>
        <div className={styles["logo-wrapper"] + " pointer"}>IEEE SIGHT</div>
      </Link>

      <div className={styles["nav-links-wrapper"]}>
        <ul>
          <Link href={"/"} passHref>
            <li>HOME</li>
          </Link>
          <Link href={"/knowledgehub"} passHref>
            <li>KNOWLEDGE HUB</li>
          </Link>
          <Link href={"/solutionshub"} passHref>
            <li>SOLUTIONS HUB</li>
          </Link>
          <Link href={"/problemshub"} passHref>
            <li>PROBLEMS HUB</li>
          </Link>
        </ul>
      </div>

      <div className={styles["login-wrapper"]}>
        {!username && <Link href="/auth">Login</Link>}
        {username && (
          <div className={styles["user-cred-wrapper"]}>
            <Link href={"/admin"} passHref>
              <p className={styles["write-post"]}>
                <span
                  className={styles["new-post-icon"] + " iconify"}
                  data-icon="bytesize:plus"
                ></span>{" "}
                &nbsp;Post
              </p>
            </Link>
            <Link href={`/${username}`} passHref>
              <div
                className={styles["avatar"] + " pointer"}
                style={{ backgroundImage: `url(${user.photoURL})` }}
              ></div>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

function HamMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className={`ham-menu ${menuOpen ? "menu-opened" : ""}`}>
      <div
        className="burger-container"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        <div id="burger">
          <div className="bar topBar"></div>
          <div className="bar btmBar"></div>
        </div>
      </div>
      <ul className="menu">
        <li className="menu-item">
          <Link href={"/"} passHref>
            HOME
          </Link>
        </li>
        <li className="menu-item">
          <Link href={"/knowledgehub"} passHref>
            KNOWLEDGE HUB
          </Link>
        </li>
        <li className="menu-item">
          <Link href={"/solutionshub"} passHref>
            SOLUTIONS HUB
          </Link>
        </li>
        <li className="menu-item">
          <Link href={"/problemshub"} passHref>
            PROBLEMS HUB
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
