import React, { useEffect } from "react";
import styles from "./filter.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getDiets,
  getRecipeFilterByDiet,
  getRecipeFilterByOrigin,
} from "../../redux/actions";

export function Filter() {
  const dispatch = useDispatch();
  const onFilterOrigin = (event) => {
    dispatch(getRecipeFilterByOrigin(event.target.value));
  };

  // Filter By Diet
  const diets = useSelector((state) => state.diets);

  const onFilterDiet = (event) => {
    dispatch(getRecipeFilterByDiet(event.target.value));
  };

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="filter">
          <p className={styles.labelTitle}>Filter by Origin:</p>
          <select name="filter" onChange={onFilterOrigin}>
            <option value="all">All Recipes</option>
            <option value="api">Existing Recipes</option>
            <option value="db">Created by User</option>
          </select>
        </label>
      </div>
      <div>
        <label htmlFor="filter">
          <p className={styles.labelTitle}>Filter by Diets:</p>
          <select name="filter" onChange={onFilterDiet}>
            <option value="all">All Diets</option>
            {diets &&
              diets.map((diet) => {
                return (
                  <option value={diet.name} key={diet.id}>
                    {diet.name}
                  </option>
                );
              })}
          </select>
        </label>
      </div>
    </div>
  );
}
