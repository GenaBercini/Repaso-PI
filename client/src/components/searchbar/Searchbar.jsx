import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { getRecipeByName } from "../../redux/actions";

export function Searchbar() {
  const dispatch = useDispatch();
  const [recipeName, setRecipeName] = useState("");

  const handleInputChange = (event) => {
    setRecipeName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(getRecipeByName(recipeName));
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
