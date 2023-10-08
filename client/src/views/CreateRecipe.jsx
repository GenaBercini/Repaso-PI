import React from "react";
import styles from "./createRecipe.module.css";

export function CreateRecipe() {
  return (
    <div className={styles.container}>
      <form action="" className={styles.formContainer}>
        <div className={styles.columsContainer}>
          <div className={styles.leftForm}>
            <label>
              Title
              <input type="text" className={styles.textInput}/>
            </label>
            <label>
              Image
              <input type="text" className={styles.textInput}/>
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
                <input type="text" className={styles.textInput}/>
              </label>
              <label>
                Time Preparation
                <input type="text" className={styles.textInput}/>
              </label>
            </div>
            <div>
              <label>
                Servings
                <input type="text" className={styles.textInput}/>
              </label>
              <label>
                Price per Servings
                <input type="text" className={styles.textInput}/>
              </label>
            </div>
            <label htmlFor="" className={styles.dietsSelect}>
              Choose the diets
              <select>
                <option value="">Demo Diet</option>
              </select>
            </label>
          </div>
        </div>
        <input type="submit" className={styles.submitBtn} />
      </form>
    </div>
  );
}
