import React from "react";
import styles from "./order.module.css";
import { useDispatch } from "react-redux";
import {
  getRecipeSortedByName,
  getRecipeSortedByScore,
} from "../../redux/actions";

export function Order() {
  const dispatch = useDispatch();
  function onChange(e) {
    let sort = e.target.value;
    if (sort === "A-Z" || sort === "Z-A") dispatch(getRecipeSortedByName(sort));
    if (sort === "ascendent" || sort === "descendent")
      dispatch(getRecipeSortedByScore(sort));
  }
  return (
    <div className={styles.container}>
      <label htmlFor="alfabeticalSort">
        <p className={styles.labelTitle}>Sort by Name:</p>
        <select name="alfabeticalSort" onChange={onChange}>
          <option value="A-Z">Ascendent</option>
          <option value="Z-A">Descendent</option>
        </select>
      </label>
      <label htmlFor="numericalSort">
        <p className={styles.labelTitle}>Sort by Score:</p>
        <select name="numericalSort" onChange={onChange}>
          <option value="ascendent">Ascendent</option>
          <option value="descendent">Descendent</option>
        </select>
      </label>
    </div>
  );
}
