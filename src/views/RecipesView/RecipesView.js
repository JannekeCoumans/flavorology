import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APIHandler, RecipeSettings } from "config/C4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";

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
      <div className="recipesView__wrapper container">
        <h1>Alle recepten</h1>
        <div className="recipesView__wrapper--items">
          {Object.values(allRecipes).length > 0 &&
            Object.values(allRecipes).map((recipe, i) => {
              const kitchenName = RecipeSettings.kitchenTypes.filter(item => item.shortName === recipe.kitchen)[0].longName;
              return (
                <Link
                  key={i}
                  to={`/recept/${Object.keys(allRecipes)[i]}`}
                  className="recipesView__item"
                >
                  <div className="image">
                    <img src={recipe.image} alt="" />
                  </div>
                  <div className="text">
                    <h1>{recipe.recipeName}</h1>
                    <p>{recipe.duration} minuten</p>
                    <p>{recipe.quantityPerson} personen</p>
                    <p>{kitchenName}</p>
                    {recipe.labelTypeDish === "vegetarian" && (
                      <p>
                        <FontAwesomeIcon icon={faLeaf} /> Vegetarisch gerecht
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default RecipesView;
