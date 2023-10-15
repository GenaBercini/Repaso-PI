import React from "react";
import styles from "./navbar.module.css";
import { Link } from "react-router-dom";


export function Navbar() {
  return (
    <div className={styles.navbarContainer}>
      <Link className={styles.linkButtons} to="/home">Dog App</Link>
      {/* Insert Searchbar & Filter component */}
      <Link className={styles.linkButtons} to="/create">Create Dog</Link>
    </div>
  );
}
