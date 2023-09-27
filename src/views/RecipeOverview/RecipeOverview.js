import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCheck,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

import {
  AddToShoppingList,
  AlterRecipe,
  APIHandler,
  CheckShoppingList,
  Modal,
  RecipeOverviewHeader,
  StorageHandler,
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

const checkGuestMode = (userId, callback) => {
  const { pathname } = window.location;
  const recipeUrl = pathname.split("/recept/")[1];
  const recipeUserId = recipeUrl.split("/")[1];

  if (userId === recipeUserId) {
    callback(false);
  } else {
    callback(true);
  }
};

const getRecipe = async (userId, id, callback) => {
  const recipe = await APIHandler.getRecipe(userId, id);
  if (recipe && recipe.ingredients) {
    recipe.ingredients.sort((a, b) =>
      a.ingredientType > b.ingredientType
        ? 1
        : b.ingredientType > a.ingredientType
        ? -1
        : 0
    );
  }
  callback(recipe);
};

const RecipeOverview = () => {
  const [userId] = useState(StorageHandler.get("user"));
  const [recipe, setRecipe] = useState({});
  const [recipeId, setRecipeId] = useState("");
  const [modal, openModal] = useState(false);
  const [addedToList, setAddedToList] = useState(false);
  const [guestMode, setGuestMode] = useState(null);

  const { ingredients, preperationSteps } = recipe;

  const checkIfOnShoppingList = async () => {
    const res = await CheckShoppingList(recipeId);
    if (res === true) {
      setAddedToList(true);
    } else if (res === false) {
      setAddedToList(false);
    }
  };

  useEffect(() => {
    if (guestMode === null) {
      checkGuestMode(userId, setGuestMode);
    }
    if (guestMode === true) {
    }
    const { pathname } = window.location;
    const recipeUrl = pathname.split("/recept/")[1];
    const recipeId = recipeUrl.split("/")[2];

    getRecipe(userId, recipeId, setRecipe);
    setRecipeId(recipeId);
  }, [userId, setRecipe, guestMode]);

  checkIfOnShoppingList();

  const checkListItems = async () => {
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
    setAddedToList(true);
  };

  return (
    <div className="recipeOverview">
      <RecipeOverviewHeader item={recipe} />
      <section className="recipeOverview__content">
        <div className="recipeOverview__content--ingredients">
          <h1 className="sectionTitle">Ingrediënten</h1>
          {ingredients && ingredients.length >= 1 ? (
            <>
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
                        <span className="checkbox">
                          <div className="checkbox-inner">
                            <FontAwesomeIcon icon={faCheck} />
                          </div>
                        </span>

                        <span className="ingredient-name">
                          {item.quantity}{" "}
                          {convertQuantityType(item.quantityType)}{" "}
                          {item.ingredientName}
                        </span>
                      </label>
                    </li>
                  ))}
              </ul>

              <div className="btn-wrapper column-dir flex-left">
                <button
                  className="btn"
                  onClick={() => checkListItems()}
                  disabled={addedToList}
                >
                  {addedToList ? (
                    <span>
                      <FontAwesomeIcon icon={faCheck} /> Toegevoegd!
                    </span>
                  ) : (
                    "Voeg toe aan lijstje"
                  )}
                </button>
                {addedToList && (
                  <Link
                    className="btn-flat check-list"
                    to="/boodschappenlijstje"
                  >
                    Bekijk je lijstje <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                )}
              </div>
            </>
          ) : (
            <>
              <p>Je hebt nog geen ingrediënten toegevoegd voor dit recept.</p>
              <div className="btn-wrapper">
                <button className="btn" onClick={() => openModal(!modal)}>
                  Recept aanpassen <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            </>
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
