import React, { useEffect } from "react";
import styles from "./styles/createRecipe.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getDiets } from "../redux/actions";

export function CreateRecipe() {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);

  console.log(diets);
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <form action="" className={styles.formContainer}>
        <div className={styles.columsContainer}>
          <div className={styles.leftForm}>
            <label>
              Title
              <input type="text" className={styles.textInput} />
            </label>
            <label>
              Image
              <input type="text" className={styles.textInput} />
            </label>
            <label>
              Description
              <textarea rows={10} cols={40} />
            </label>
          </div>
          <div className={styles.rightForm}>
            <div>
              <label>
                Health Score
                <input type="text" className={styles.textInput} />
              </label>
              <label>
                Time Preparation
                <input type="text" className={styles.textInput} />
              </label>
            </div>
            <div>
              <label>
                Servings
                <input type="text" className={styles.textInput} />
              </label>
              <label>
                Price per Servings
                <input type="text" className={styles.textInput} />
              </label>
            </div>
            <label htmlFor="" className={styles.dietsSelect}>
              Choose the diets
              <select>
                {diets.map((diet) => {
                  return (
                    <option value={diet.name} key={diet.name} id={diet.id}>
                      {diet.name}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>
        </div>
        <input type="submit" className={styles.submitBtn} />
      </form>
    </div>
  );
}
