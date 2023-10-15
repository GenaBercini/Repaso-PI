import React, { useEffect } from "react";
import styles from "./styles/home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../redux/actions";
import { Navbar } from "../components/navbar/Navbar";
import { Footer } from "../components/footer/Footer";
import { Loading } from "../components/loading/Loading";
import { Card } from "../components/card/Card";

export function Home() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.loading);
  const recipes = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.cardsContainer}>
        {loading ? (
          <Loading />
        ) : (
          recipes.map((recipe) => {
            return (
              <Card
                key={recipe.id}
                id={recipe.id}
                title={recipe.title}
                image={recipe.image}
                diets={recipe.diets}
              />
            );
          })
        )}
      </div>
      <Footer />
    </div>
  );
}
