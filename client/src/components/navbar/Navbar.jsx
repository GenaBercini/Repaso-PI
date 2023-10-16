import React from "react";
import styles from "./navbar.module.css";
import { Link } from "react-router-dom";
import { Searchbar } from "../searchbar/Searchbar";
import { Order } from "../order/Order";
import { Filter } from "../filter/Filter";

export function Navbar() {
  return (
    <div className={styles.navbarContainer}>
      <Link className={styles.linkButtons} to="/home">
        Dog App
      </Link>
      <div className={styles.filterCont}>
        <Searchbar />
        <Filter />
        <Order />
      </div>
      <Link className={styles.linkButtons} to="/create">
        Create Dog
      </Link>
    </div>
  );
}
