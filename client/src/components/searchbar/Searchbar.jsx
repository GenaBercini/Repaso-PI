import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { getRecipeByName } from "../../redux/actions";

export function Searchbar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [recipeName, setRecipeName] = useState("");

  const handleInputChange = (event) => {
    setRecipeName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(getRecipeByName(recipeName));
    setCurrentPage(1);
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Insert recipe name"
        value={recipeName}
        onChange={handleInputChange}
      />
      <input type="submit" />
    </form>
  );
}
