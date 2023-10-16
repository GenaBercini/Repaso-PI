import React from "react";
import styles from "./pagination.module.css";

export function PaginationButtons({
  recipesPerPage,
  totalRecipes,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className={styles.pagination}>
      {pageNumbers.map((number) => (
        <li
          key={number}
          value={number}
          onClick={(e) => paginate(e.target.value)}
          className={
            currentPage === number ? styles.currentRecipes : styles.pageItem
          }
        >
          {number}
        </li>
      ))}
    </ul>
  );
}
