import React from "react";
import styles from "./card.module.css";
import { useNavigate } from "react-router";

export function Card({ id, title, image, diets }) {
  const navigate = useNavigate();

  return (
    <div className={styles.container} onClick={() => navigate(`/detail/${id}`)}>
      <img className={styles.image} src={image} alt={title} />
      <div className={styles.textContainer}>
        <h4>{title}</h4>
        <div className={styles.diets}>
          {diets?.length > 0 ? (
            diets.slice(0, 5).map((diet) => {
              return (
                <p key={diet} className={styles.diet}>
                  {diet}
                </p>
              );
            })
          ) : (
            <p className={styles.diet}>No hay recetas suficientes</p>
          )}
        </div>
      </div>
    </div>
  );
}
