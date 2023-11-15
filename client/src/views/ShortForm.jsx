import React, { useState, useEffect } from "react";
import styles from "./styles/shortForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getDiets } from "../redux/actions";

export function ShortForm() {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const formInitialState = {
    title: "",
    image: "",
    diets: [],
    // Extra data
    healthScore: 7,
    pricePerServing: 7,
    summary:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem doloribus inventore culpa fugit architecto repellat perspiciatis exercitationem nihil, sunt aspernatur laborum quisquam nesciunt esse sed! Dolores nihil facilis minus sit?",
    servings: 7,
    readyInMinutes: 7,
  };
  const errorsInitialState = {
    title:
      "The title of the recipe can't contain numbers and should be between 5 and 10 characters.",
    diets: "At list one diet is required.",
  };

  const [disabled, setDisabled] = useState(false);
  const [newRecipe, setNewRecipe] = useState(formInitialState);
  const [inputError, setInputError] = useState(errorsInitialState);

  const onTextInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "title") {
      if (value.length > 5 && value.length < 10) {
        delete inputError.title;
      } else {
        setInputError({
          ...inputError,
          title:
            "The title of the recipe can't contain numbers and should be between 5 and 10 characters.",
        });
      }
    }

    setNewRecipe({
      ...newRecipe,
      [name]: value,
    });
  };
  const onDietSelectChange = (event) => {
    const { value } = event.target;
    const diets = newRecipe.diets;

    if (!diets.includes(value)) {
      const newDietsRecipe = [...newRecipe.diets, value];

      if (newDietsRecipe.length < 1) {
        setInputError({
          ...inputError,
          diets: "At list one diet is required.",
        });
      } else {
        delete inputError.diets;
      }

      setNewRecipe({
        ...newRecipe,
        diets: newDietsRecipe,
      });
    }
  };
  const onDeleteDiet = (event) => {
    const value = event.target.innerText;
    const newDiets = newRecipe.diets.filter((diet) => diet !== value);
    if (newDiets.length < 1) {
      setInputError({
        ...inputError,
        diets: "At list one diet is required.",
      });
    } else {
      delete inputError.diets;
    }

    setNewRecipe({
      ...newRecipe,
      diets: newDiets,
    });
  };
  const onSubmitRecipe = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3001/recipes/", newRecipe);
    alert("Recipe added successfully");
    setNewRecipe(formInitialState);
    setInputError(errorsInitialState);
  };
  useEffect(() => {
    Object.keys(inputError).length > 0 ? setDisabled(true) : setDisabled(false);
  }, [newRecipe, inputError]);
  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={onSubmitRecipe}>
        <label htmlFor="">
          Recipe Name
          <input
            name="title"
            type="text"
            className={styles.textInput}
            onChange={onTextInputChange}
            value={newRecipe.title}
          />
          <div className={styles.errorMessage}>
            {inputError.title && inputError.title}
          </div>
        </label>
        <label htmlFor="">
          Image URL
          <input
            name="image"
            type="text"
            className={styles.textInput}
            onChange={onTextInputChange}
            value={newRecipe.image}
          />
        </label>
        <label htmlFor="">
          Choose diets
          <select
            name="diet-select"
            className={styles.textInput}
            onChange={onDietSelectChange}
          >
            {diets.map((diet) => {
              return (
                <option value={diet.name} key={diet.id}>
                  {diet.name}
                </option>
              );
            })}
          </select>
          <div className={styles.errorMessage}>
            {inputError.diets && inputError.diets}
          </div>
        </label>
        <div>
          {newRecipe.diets.length > 0 &&
            newRecipe.diets.map((diet) => {
              return (
                <span
                  className={styles.dietCard}
                  key={diet}
                  value={diet}
                  onClick={onDeleteDiet}
                >
                  {diet}
                </span>
              );
            })}
        </div>
        <input className={styles.submitBtn} type="submit" disabled={disabled} />
      </form>
    </div>
  );
}
