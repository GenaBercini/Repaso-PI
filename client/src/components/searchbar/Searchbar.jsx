import React, { useState } from "react";

import { getRecipeByName } from "../../redux/actions";
import { useDispatch } from "react-redux";

export function Searchbar() {
  const dispatch = useDispatch();
  const [recipeName, setRecipeName] = useState("");

  const handleInputChange = (event) => {
    setRecipeName(event.target.value);
    console.log(event.target.value);
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
