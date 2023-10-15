import React, { useEffect } from "react";
import styles from "./styles/createRecipe.module.css";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeById } from "../redux/actions";
import { Loading } from "../components/loading/Loading";

export function RecipeDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const loading = useSelector((state) => state.loading);
  const oneRecipe = useSelector((state) => state.oneRecipe);

  useEffect(() => {
    dispatch(getRecipeById(id));
  }, [dispatch, id]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <img src={oneRecipe.image} alt={oneRecipe.title} />
          <div>
            <h3>{oneRecipe.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: oneRecipe.summary }}></div>

            {oneRecipe.diets &&
              oneRecipe.diets.map((diet) => {
                return <p key={diet}>{diet}</p>;
              })}
            <p>Health Score</p>
            <p>{oneRecipe.healthScore}</p>
            <p>Price Per Serving</p>
            <p>{oneRecipe.priceperserving}</p>
            <p>Ready in Minutes</p>
            <p>{oneRecipe.readyInMinutes}</p>
            <p>Servings</p>
            <p>{oneRecipe.servings}</p>
          </div>
        </div>
      )}
    </>
  );
}
