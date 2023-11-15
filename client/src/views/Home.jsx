import styles from "./styles/home.module.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getRecipes } from "../redux/actions";

import { Card } from "../components/card/Card";
import { Footer } from "../components/footer/Footer";
import { Navbar } from "../components/navbar/Navbar";
import { Loading } from "../components/loading/Loading";
import { PaginationButtons } from "../components/paginationButtons/PaginationButtons";

export function Home() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.loading);
  const recipes = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(8);

  const idxLastRecipe = currentPage * recipesPerPage;
  const idxFirstRecipe = idxLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(idxFirstRecipe, idxLastRecipe);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.cardsContainer}>
        {loading ? (
          <Loading />
        ) : (
          currentRecipes.map((recipe) => {
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
      <PaginationButtons
        recipesPerPage={recipesPerPage}
        totalRecipes={recipes.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      <Footer />
    </div>
  );
}
