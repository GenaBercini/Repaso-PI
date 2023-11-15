import React from "react";
import styles from "./card.module.css";
import { useNavigate } from "react-router";

export function Card({ id, title, image, diets }) {
  const navigate = useNavigate();

  return (
    <div className={styles.container} onClick={() => navigate(`/detail/${id}`)}>
      {image !== "" ? (
        <img className={styles.image} src={image} alt={title} />
      ) : (
        <img
          className={styles.image}
          src={
            "https://res.cloudinary.com/genaro-bercini/image/upload/v1696723917/Polite-Things-You-Do-When-Youre-Trying-Another-Cultural-Food-That-Are-Actually-Rude-2000-d6610b3b71db46c595594a79b469379d_bnnrhr.jpg"
          }
          alt={"default card logo"}
        />
      )}
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
            <p className={styles.diet}>No hay dietas suficientes</p>
          )}
        </div>
      </div>
    </div>
  );
}
