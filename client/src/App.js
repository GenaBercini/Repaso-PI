import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./views/Home";
import { NotFound } from "./views/NotFound";
import { Landing } from "./views/Landing";
import { RecipeDetail } from "./views/RecipeDetail";
import { CreateRecipe } from "./views/CreateRecipe";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<RecipeDetail />} />
        <Route path="/create" element={<CreateRecipe />} />
        <Route path="/*" element={<NotFound message="Page" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
