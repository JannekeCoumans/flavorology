import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APIHandler } from "config/C4";

const getAllRecipes = async (callBack) => {
  const recipes = await APIHandler.getAllRecipes();
  callBack(recipes);
};

const RecipesView = () => {
  const [allRecipes, setAllRecipes] = useState({});

  useEffect(() => {
    getAllRecipes(setAllRecipes);
  }, [setAllRecipes]);

  return (
    <div className="recipesView">
      <h1>Recipes View</h1>
      {Object.values(allRecipes).length > 0 &&
        Object.values(allRecipes).map((recipe, i) => {
          return (
            <Link key={i} to={`/recept/${Object.keys(allRecipes)[i]}`}>
              <h1>{recipe.name || recipe.recipeName}</h1>
            </Link>
          );
        })}
    </div>
  );
};

export default RecipesView;
