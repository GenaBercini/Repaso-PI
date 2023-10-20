import React from "react";
import styles from "./order.module.css";
import { useDispatch } from "react-redux";
import { getRecipeSortedByName } from "../../redux/actions";

export function Order() {
  const dispatch = useDispatch();

  function onChange(e) {
    let sort = e.target.value;
    if (sort === "A-Z" || sort === "Z-A") dispatch(getRecipeSortedByName(sort));
  }

  return (
    <label htmlFor="alfabeticalSort">
      <p className={styles.labelTitle}>Sort by Name:</p>
      <select name="alfabeticalSort" onChange={onChange}>
        <option value="A-Z">Ascendent</option>
        <option value="Z-A">Descendent</option>
      </select>
    </label>
  );
}
