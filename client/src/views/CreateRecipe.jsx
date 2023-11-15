// import axios from "axios";
import { getDiets } from "../redux/actions";
// import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styles from "./styles/createRecipe.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export function CreateRecipe() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const formInitialState = {
    title: "",
    healthScore: 0,
    pricePerServing: 0,
    image: "",
    summary: "",
    servings: 0,
    readyInMinutes: 0,
    diets: [],
  };
  const errorsInitialState = {
    title:
      "The title of the recipe can't contain numbers and should be between 5 and 30 characters.",
    summary: "The description should be at least 10 words length.",
    healthScore: "Health score should be a number between 1 and 100.",
    pricePerServing: "The price should be a number between 1 and 500 dolars.",
    readyInMinutes: "Preparation should be a number between 15 and 60 minutes.",
    servings: "Serving should be a number between 1 and 10.",
    diets: "At list one diet is required.",
  };

  const diets = useSelector((state) => state.diets);
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const [disabled, setDisabled] = useState(false);
  const [newRecipe, setNewRecipe] = useState(formInitialState);
  const [inputError, setInputError] = useState(errorsInitialState);

  function handleChange(event) {
    const userValue = event.target.value;
    const validator = event.target.name;

    if (validator === "title") {
      if (userValue.length > 5 && userValue.length < 30) {
        delete inputError.title;
      } else {
        setInputError({
          ...inputError,
          title:
            "The title of the recipe can't contain numbers and should be between 5 and 30 characters.",
        });
      }
    }

    setNewRecipe({
      ...newRecipe,
      [validator]: userValue,
    });
  }

  function onSelectChange(event) {
    const { name, value } = event.target;
    const diets = newRecipe.diets;

    !diets.includes(value) && diets.push(value);

    if (name === "dietsSelect") {
      if (newRecipe.diets.length > 0) delete inputError.diets;
      else
        setInputError({
          ...inputError,
          diets: "At list one diet is required.",
        });
    }

    setNewRecipe({
      ...newRecipe,
      diets: diets,
    });
  }

  function deleteDiets(event) {
    const { value } = event.target;

    setNewRecipe({
      ...newRecipe,
      diets: newRecipe.diets.filter((diet) => diet !== value),
    });

    if (newRecipe.diets.length <= 1) {
      inputError.diets = "At list one diet is required.";
    } else delete inputError.diets;
  }

  useEffect(() => {
    Object.keys(inputError).length > 0 ? setDisabled(true) : setDisabled(false);
  }, [newRecipe, inputError]);

  function onSubmit() {
    axios.post("http://localhost:3001/recipes", newRecipe);
    setNewRecipe(formInitialState);
  }

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={onSubmit}>
        <div className={styles.columsContainer}>
          <div className={styles.leftForm}>
            <label>
              Title
              <input
                type="text"
                className={styles.textInput}
                name="title"
                value={newRecipe.title}
                onChange={handleChange}
              />
              <div className={styles.errorMessage}>
                {inputError.title ? inputError.title : ""}
              </div>
            </label>
            <label>
              Image
              <input
                type="text"
                className={styles.textInput}
                name="image"
                value={newRecipe.image}
                onChange={handleChange}
              />
            </label>
            <label>
              Description
              <textarea
                rows={10}
                cols={40}
                name="summary"
                value={newRecipe.summary}
                onChange={handleChange}
              />
              <div className={styles.errorMessage}>
                {inputError.summary ? inputError.summary : ""}
              </div>
            </label>
          </div>
          <div className={styles.rightForm}>
            <div className={styles.rigthinner}>
              <label>
                Health Score
                <input
                  type="text"
                  className={styles.textInput}
                  name="healthScore"
                  value={newRecipe.healthScore}
                  onChange={handleChange}
                />
                <div className={styles.errorMessage}>
                  {inputError.healthScore ? inputError.healthScore : ""}
                </div>
              </label>
              <label>
                Time Preparation
                <input
                  type="text"
                  className={styles.textInput}
                  name="readyInMinutes"
                  value={newRecipe.readyInMinutes}
                  onChange={handleChange}
                />
                <div className={styles.errorMessage}>
                  {inputError.readyInMinutes ? inputError.readyInMinutes : ""}
                </div>
              </label>
            </div>
            <div className={styles.rigthinner}>
              <label>
                Servings
                <input
                  type="text"
                  className={styles.textInput}
                  name="servings"
                  value={newRecipe.servings}
                  onChange={handleChange}
                />
                <div className={styles.errorMessage}>
                  {inputError.servings ? inputError.servings : ""}
                </div>
              </label>
              <label>
                Price per Servings
                <input
                  type="text"
                  className={styles.textInput}
                  name="pricePerServing"
                  value={newRecipe.pricePerServing}
                  onChange={handleChange}
                />
                <div className={styles.errorMessage}>
                  {inputError.pricePerServing ? inputError.pricePerServing : ""}
                </div>
              </label>
            </div>
            <div className={styles.dietsCont}>
              <label className={styles.dietsSelect}>
                Choose the diets
                <select name="dietsSelect" onChange={onSelectChange}>
                  {diets.map((diet) => {
                    return (
                      <option value={diet.name} key={diet.id}>
                        {diet.name}
                      </option>
                    );
                  })}
                </select>
                <div className={styles.errorMessage}>
                  {inputError.diets ? inputError.diets : ""}
                </div>
              </label>
              <div className={styles.dietCardCont}>
                {newRecipe.diets.length > 0 &&
                  newRecipe.diets.map((diet) => (
                    <div className={styles.dietCard} key={diet}>
                      <p>{diet}</p>
                      <button
                        type="button"
                        onClick={deleteDiets}
                        className={styles.deleteTemp}
                        name="deleteTemp"
                        value={diet}
                      >
                        X
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <input type="submit" disabled={disabled} className={styles.submitBtn} />
      </form>
    </div>
  );
}
