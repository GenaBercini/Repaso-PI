import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles/createRecipe.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDiets } from "../redux/actions";

export function CreateRecipe() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const diets = useSelector((state) => state.diets);
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const [disabled, setDisabled] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    healthScore: 0,
    pricePerServing: 0,
    image: "",
    summary: "",
    servings: 0,
    readyInMinutes: 0,
    diets: [],
  });
  const [inputError, setInputError] = useState({
    title:
      "The title of the recipe can't contain numbers and should be between 5 and 30 characters.",
    // image: "",
    summary: "The description should be at least 10 words length.",
    healthScore: "Health score should be a number between 1 and 100.",
    pricePerServing: "The price should be a number between 1 and 500 dolars.",
    readyInMinutes: "Preparation should be a number between 15 and 60 minutes.",
    servings: "Serving should be a number between 1 and 10.",
    diets: "At list one diet is required.",
  });

  function handleChange(e) {
    const userValue = e.target.value;
    const validator = e.target.name;
    //  let errors = newBreed.errors;

    // TITLE
    if (validator === "title") {
      if (
        isNaN(userValue) &&
        userValue.trim().length > 0 &&
        userValue.trim().length < 30
      ) {
        delete inputError.title;
      } else {
        inputError.title =
          "The title of the recipe can't contain numbers and should be between 5 and 30 characters.";
      }
    }
    // DESCRIPTION
    if (validator === "summary") {
      if (isNaN(userValue) && userValue.split(" ").length >= 10) {
        delete inputError.summary;
      } else {
        inputError.summary =
          "The description should be at least 10 words length.";
      }
    }
    // HEALTH SCORE
    if (validator === "healthScore") {
      if (
        !isNaN(userValue) &&
        parseFloat(userValue) > 1 &&
        parseFloat(userValue) < 100
      ) {
        delete inputError.healthScore;
      } else {
        inputError.healthScore =
          "Health score should be a number between 1 and 100.";
      }
    }
    // READY IN MINUTES
    if (validator === "readyInMinutes") {
      if (
        !isNaN(userValue) &&
        parseFloat(userValue) > 15 &&
        parseFloat(userValue) < 60
      ) {
        delete inputError.readyInMinutes;
      } else {
        inputError.readyInMinutes =
          "Preparation should be a number between 15 and 60 minutes.";
      }
    }
    // SERVINGS
    if (validator === "servings") {
      if (
        !isNaN(userValue) &&
        parseFloat(userValue) > 1 &&
        parseFloat(userValue) < 10
      ) {
        delete inputError.servings;
      } else {
        inputError.servings = "Serving should be a number between 1 and 10.";
      }
    }
    // PRICE PER SERVING
    if (validator === "pricePerServing") {
      if (
        !isNaN(userValue) &&
        parseFloat(userValue) > 1 &&
        parseFloat(userValue) < 500
      ) {
        delete inputError.pricePerServing;
      } else {
        inputError.pricePerServing =
          "The price should be a number between 1 and 500 dolars.";
      }
    }

    setNewRecipe({
      ...newRecipe,
      [validator]: userValue,
    });
  }
  // onSelectChange --> function for select Temperament
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
  // Delete function for Temperament Select
  function deleteTemperament(event) {
    const { value } = event.target;

    setNewRecipe({
      ...newRecipe,
      diets: newRecipe.diets.filter((diet) => diet !== value),
    });

    if (newRecipe.diets.length < 1) {
      inputError.diets = "At list one diet is required.";
    } else delete inputError.diets;
  }

  // useEffect where validation takes place
  useEffect(() => {
    Object.keys(inputError).length > 0 ? setDisabled(true) : setDisabled(false);
  }, [newRecipe, inputError]);

  // Submit function to add a new breed
  function onSubmit(e) {
    e.preventDefault();
    axios.post("http://localhost:3001/recipes", newRecipe);
    alert("Recipe added successfully");
    navigate("/home");
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
              </label>
              <div className={styles.dietCardCont}>
                {newRecipe.diets.length > 0 &&
                  newRecipe.diets.map((diet) => (
                    <div className={styles.dietCard} key={diet}>
                      <p>{diet}</p>
                      <button
                        type="button"
                        onClick={deleteTemperament}
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
