import React, { useEffect, useState } from "react";
import {
  APIHandler,
  FormatRecipeUrl,
  RecipeSettings,
  StorageHandler,
} from "config/C4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCheck,
  faCircleNotch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const getShoppingListItems = async (
  userId,
  setRecipesInList,
  setShoppingListItems,
  setLoading
) => {
  const shoppingList = await APIHandler.getShoppingList(userId);
  const { shoppingListOrder } = RecipeSettings;

  if (shoppingList && shoppingList.list) {
    const list = shoppingList.list;

    if (list && list.length > 0) {
      const recipeIds = list.map((item) => item.recipeId);
      const allRecipes = Object.entries(await APIHandler.getAllRecipes(userId));
      const recipesInList = recipeIds.map((id) =>
        allRecipes.filter((recipe) => recipe[0] === id)
      );

      const allListItems = list.map((recipe) => recipe.items).flat();

      const sortedList = [];
      allListItems.forEach((item) => {
        if (
          !sortedList.filter(
            (i) =>
              i.ingredientName.toLowerCase() ===
                item.ingredientName.toLowerCase() &&
              i.quantityType === item.quantityType
          ).length > 0
        ) {
          sortedList.push(item);
        } else {
          const itemInList = sortedList.filter(
            (i) =>
              i.ingredientName.toLowerCase() ===
              item.ingredientName.toLowerCase()
          );
          const itemInListId = sortedList.indexOf(itemInList[0]);
          if (itemInListId > -1) {
            const currentQuantity = sortedList[itemInListId].quantity;
            const quantityToAdd = item.quantity;
            sortedList[itemInListId].quantity =
              parseInt(currentQuantity) + parseInt(quantityToAdd);
          }
        }
      });

      const orderForIndexVals = shoppingListOrder.slice(0).reverse();
      if (sortedList) {
        sortedList.sort((a, b) => {
          const aIndex = -orderForIndexVals.indexOf(a.ingredientType);
          const bIndex = -orderForIndexVals.indexOf(b.ingredientType);
          return aIndex - bIndex;
        });
      }

      const convertedTextareaItems = sortedList
        .map(
          (i) =>
            `${i.quantity} ${
              i.quantityType !== "piece" ? i.quantityType : "stuks"
            } ${i.ingredientName}\n`
        )
        .join("");

      setRecipesInList(recipesInList);
      setShoppingListItems(convertedTextareaItems);
      setLoading(false);
    } else {
      setRecipesInList([]);
      setShoppingListItems([]);
      setLoading(false);
    }
  } else {
    setRecipesInList([]);
    setShoppingListItems([]);
    setLoading(false);
  }
};

const ShoppingListView = () => {
  const [userId] = useState(StorageHandler.get("user"));
  const [shoppingListItems, setShoppingListItems] = useState(null);
  const [recipesInList, setRecipesInList] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!shoppingListItems) {
      getShoppingListItems(
        userId,
        setRecipesInList,
        setShoppingListItems,
        setLoading
      );
    }
  }, [userId, shoppingListItems]);

  const copyFunc = () => {
    const boodschappenlijstje = document.getElementById("textarea").value;
    navigator.clipboard.writeText(boodschappenlijstje);
    setIsCopied(true);
  };

  const deleteList = async () => {
    await APIHandler.deleteShoppingList(userId);
    setShoppingListItems(null);
    setRecipesInList(null);
  };

  const deleteItem = async (itemId) => {
    const currentShoppingList = [...recipesInList];
    const itemToRemove = currentShoppingList.filter(
      (recipe) => recipe[0][0] === itemId
    );

    const itemToRemoveId = itemToRemove[0][0][0];

    await APIHandler.removeRecipeFromShoppingList(userId, itemToRemoveId);
    setLoading(true);
    getShoppingListItems(
      userId,
      setRecipesInList,
      setShoppingListItems,
      setLoading
    );
  };

  if (loading) {
    return (
      <div className="loading">
        <FontAwesomeIcon icon={faCircleNotch} spin />
      </div>
    );
  } else {
    if (shoppingListItems && shoppingListItems.length > 0) {
      return (
        <div className="shoppingListView container">
          <div className="shoppingListView__overviewRecipes">
            <h3>Deze recepten heb je in je lijstje staan:</h3>
            {recipesInList && recipesInList.length > 0 && (
              <div className="shoppingListView__overviewRecipes--items">
                {recipesInList.map((recipe, i) => {
                  const recipeId = recipe[0][0];
                  const recipeContent = recipe[0][1];
                  const { image, recipeName } = recipeContent;
                  return (
                    <div className="overViewRecipes__items--item" key={i}>
                      <Link
                        to={`/recept/${FormatRecipeUrl(
                          userId,
                          recipeName,
                          recipeId
                        )}`}
                      >
                        <div
                          className="image"
                          style={{ backgroundImage: `url(${image})` }}
                        />
                      </Link>
                      <div className="text">
                        <p>{recipeName}</p>
                        <button
                          className="btn-flat"
                          onClick={() => deleteItem(recipeId)}
                        >
                          Item verwijderen <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="shoppingListView__content">
            <textarea
              id="textarea"
              width="200"
              height="200"
              value={shoppingListItems}
              disabled
            />

            <div className="btn-wrapper">
              <button
                className="btn"
                onClick={() => copyFunc()}
                disabled={
                  isCopied ||
                  (shoppingListItems && shoppingListItems.length <= 0)
                }
              >
                {isCopied ? (
                  <span>
                    <FontAwesomeIcon icon={faCheck} /> gekopieerd!
                  </span>
                ) : (
                  "Kopieër lijstje"
                )}
              </button>
              <button
                className="btn btn-inverse"
                onClick={() => {
                  deleteList();
                }}
              >
                Verwijder lijstje
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="shoppingListView shoppingListView-empty">
        <h4>Oeps! Hier is nog niks te zien, want...</h4>
        <h1>Je lijstje is nog leeg!</h1>
        <div className="btn-wrapper">
          <Link to="/recepten" className="btn">
            Bekijk recepten <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </div>
    );
  }
};

export default ShoppingListView;
