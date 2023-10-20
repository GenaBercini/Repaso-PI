import React, { useEffect } from "react";
import styles from "./filter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, getRecipeFilterByDiet } from "../../redux/actions";

export function Filter() {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);

  const onFilterDiet = (event) => {
    dispatch(getRecipeFilterByDiet(event.target.value));
  };

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  return (
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
  );
}
