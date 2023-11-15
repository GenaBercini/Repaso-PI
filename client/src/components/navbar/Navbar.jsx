import React from "react";
import styles from "./navbar.module.css";
import { Link } from "react-router-dom";

import { Order } from "../order/Order";
import { Filter } from "../filter/Filter";
import { Searchbar } from "../searchbar/Searchbar";

export function Navbar() {
  return (
    <div className={styles.navbarContainer}>
      <Link className={styles.linkButtons} to="/home">
        Recipe App
      </Link>
      <div className={styles.filterCont}>
        <Searchbar />
        <Filter />
        <Order />
      </div>
      <Link className={styles.linkButtons} to="/short-form">
        Create Recipe
      </Link>
    </div>
  );
}
