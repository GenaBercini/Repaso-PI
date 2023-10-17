import React, { useEffect } from "react";
import styles from "./styles/recipeDetail.module.css";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeById } from "../redux/actions";
import { Loading } from "../components/loading/Loading";

export function RecipeDetail() {
  const navigate = useNavigate();
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
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.headerChild}>
              {oneRecipe.image !== "" ? (
                <img
                  className={styles.image}
                  src={oneRecipe.image}
                  alt={oneRecipe.image}
                />
              ) : (
                <img
                  className={styles.image}
                  src={
                    "https://res.cloudinary.com/genaro-bercini/image/upload/v1696723917/Polite-Things-You-Do-When-Youre-Trying-Another-Cultural-Food-That-Are-Actually-Rude-2000-d6610b3b71db46c595594a79b469379d_bnnrhr.jpg"
                  }
                  alt={"default card logo"}
                />
              )}
            </div>
            <div className={styles.headerChild}>
              <h3>{oneRecipe.title}</h3>
              <div className={styles.diets}>
                {oneRecipe.diets &&
                  oneRecipe.diets.map((diet) => {
                    return (
                      <p key={diet} className={styles.diet}>
                        {diet}
                      </p>
                    );
                  })}
              </div>
              <div>
                <div className={styles.numbers}>
                  <div>
                    <p className={styles.subTitles}>Health Score</p>
                    <p>{oneRecipe.healthScore}</p>
                  </div>
                  <div>
                    <p className={styles.subTitles}>Price Per Serving</p>
                    <p>{oneRecipe.pricePerServing}</p>
                  </div>
                </div>
                <div className={styles.numbers}>
                  <div>
                    <p className={styles.subTitles}>Ready in Minutes</p>
                    <p>{oneRecipe.readyInMinutes}</p>
                  </div>
                  <div>
                    <p className={styles.subTitles}>Servings</p>
                    <p>{oneRecipe.servings}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: oneRecipe.summary }}
          ></div>
          <button
            onClick={() => navigate("/home")}
            className={styles.backButtom}
          >
            Return Home
          </button>
        </div>
      )}
    </>
  );
}
