import { constants } from "./constants";

const initialState = {
  loading: false,
  recipes: [],
  fullRecipes: [],
  oneRecipe: {},
  diets: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        fullRecipes: action.payload,
        loading: false,
      };
    case constants.GET_RECIPE_BY_ID:
      return {
        ...state,
        oneRecipe: action.payload,
        loading: false,
      };
    case constants.GET_RECIPE_BY_NAME:
      return {
        ...state,
        recipes: action.payload,
        loading: false,
      };
    case constants.SORT_RECIPES_BY_NAME:
      let orderedByName = [...state.recipes];
      orderedByName.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase())
          return action.payload === "A-Z" ? -1 : 1;
        if (a.title.toLowerCase() > b.title.toLowerCase())
          return action.payload === "A-Z" ? 1 : -1;
        return 0;
      });
      return {
        ...state,
        recipes: orderedByName,
        loading: false,
      };
    case constants.FILTER_RECIPES_BY_DIET:
      let filteredByDiet = [...state.recipes];
      if (action.payload === "all") filteredByDiet = [...state.fullRecipes];
      else
        filteredByDiet = filteredByDiet.filter(
          (recipe) => recipe.diets && recipe.diets.includes(action.payload)
        );
      return {
        ...state,
        recipes: filteredByDiet,
        loading: false,
      };
    case constants.GET_DIETS:
      return {
        ...state,
        diets: action.payload,
        loading: false,
      };
    case constants.LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
