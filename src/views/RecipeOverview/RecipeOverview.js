import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCheck,
  faPen,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

import {
  AddToShoppingList,
  AlterRecipe,
  APIHandler,
  CheckShoppingList,
  Modal,
  RecipeOverviewHeader,
} from "config/C4";

const convertQuantityType = (quantityType) => {
  switch (quantityType) {
    case "piece":
      return "stuks";
    case "gram":
      return "gram";
    case "mililiter":
      return "ml";
    case "teaspoon":
      return "theelepel";
    case "tablespoon":
      return "eetlepel";
    default:
      return null;
  }
};

const getRecipe = async (id, callback) => {
  const recipe = await APIHandler.getRecipe(id);
  recipe.ingredients.sort((a, b) =>
    a.ingredientType > b.ingredientType
      ? 1
      : b.ingredientType > a.ingredientType
      ? -1
      : 0
  );
  callback(recipe);
};

const RecipeOverview = () => {
  const [recipe, setRecipe] = useState({});
  const [recipeId, setRecipeId] = useState("");
  const [modal, openModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { ingredients, preperationSteps } = recipe;

  useEffect(() => {
    const { pathname } = window.location;
    const recipeId = pathname.split("/recept/")[1];
    getRecipe(recipeId, setRecipe);
    setRecipeId(recipeId);
  }, [setRecipe]);

  const checkListItems = () => {
    setLoading(true);
    const checkboxes = [...document.getElementsByName("ingredient")]
      .filter((c) => c.checked)
      .map((c) => c.id);

    const recipeToAdd = {
      recipeId,
      items: [],
    };

    recipeToAdd.items = checkboxes.map((check) => {
      const array = ingredients.filter((ingredient) => {
        return ingredient.ingredientName === check;
      });
      return array[0];
    });

    AddToShoppingList(recipeToAdd);
    setLoading(false);
  };

  return (
    <div className="recipeOverview">
      <RecipeOverviewHeader item={recipe} />
      <section className="recipeOverview__content">
        <div className="recipeOverview__content--ingredients">
          <h1 className="sectionTitle">Ingrediënten</h1>
          <ul>
            {recipe &&
              ingredients &&
              ingredients.map((item, i) => (
                <li key={i}>
                  <label>
                    <input
                      type="checkbox"
                      name="ingredient"
                      id={item.ingredientName}
                      defaultChecked
                    />

                    <span>
                      {item.quantity} {convertQuantityType(item.quantityType)}{" "}
                      {item.ingredientName}
                    </span>
                  </label>
                </li>
              ))}
          </ul>

          <button
            className="btn"
            onClick={() => checkListItems()}
            disabled={loading || CheckShoppingList(recipeId)}
          >
            {!loading && !CheckShoppingList(recipeId) && "Voeg toe aan lijstje"}
            {loading && (
              <FontAwesomeIcon className="loader" icon={faSpinner} spin />
            )}
            {CheckShoppingList(recipeId) && (
              <span>
                <FontAwesomeIcon icon={faCheck} /> Toegevoegd!
              </span>
            )}
          </button>
          {CheckShoppingList(recipeId) && (
            <Link className="btn-flat check-list" to="/boodschappenlijstjes">
              Bekijk je lijstje <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          )}
        </div>
        <div className="recipeOverview__content--preperation-steps">
          <h1>Let's get cooking</h1>
          {recipe &&
            preperationSteps &&
            preperationSteps.map((item, i) => (
              <div key={i} className="step">
                <div className="number">
                  <span>{i + 1}</span>
                </div>
                <p>{item}</p>
              </div>
            ))}
        </div>
      </section>
      <button className="alterRecipeButton" onClick={() => openModal(!modal)}>
        <FontAwesomeIcon icon={faPen} />
      </button>

      {modal && (
        <Modal modalIsOpen={openModal} clickOnBackground={false}>
          <AlterRecipe
            recipe={recipe}
            modalIsOpen={openModal}
            recipeId={recipeId}
          />
        </Modal>
      )}
    </div>
  );
};

export default RecipeOverview;
