import React from "react";
import { useParams } from "react-router";

export function RecipeDetail() {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <p>RecipeDetail</p>
      <p>{`ID: ${id}`}</p>
    </div>
  );
}
