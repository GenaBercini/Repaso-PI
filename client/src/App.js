import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./views/Home";
import { Landing } from "./views/Landing";
import { NotFound } from "./views/NotFound";
import { RecipeDetail } from "./views/RecipeDetail";
import { CreateRecipe } from "./views/CreateRecipe";
import { ShortForm } from "./views/ShortForm";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<RecipeDetail />} />
        <Route path="/create" element={<CreateRecipe />} />
        <Route path="/short-form" element={<ShortForm />} />
        <Route path="/*" element={<NotFound message="Page" />} />
      </Routes>
    </BrowserRouter>
  );
}
