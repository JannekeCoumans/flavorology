import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import { AddToFavorite, AddToShoppingList, CheckShoppingList } from "config/C4";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";

const RecipeCard = ({ item, itemKey, clsn }) => {
  const placeholderImage =
    "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg";

  return (
    <div className={`${clsn} recipeCard`}>
      <Link to={`/recept/${itemKey}`} className={`${clsn}--background`}>
        <img src={item.image || placeholderImage} alt="" loading="lazy" />
        <div className="bg-overlay" />
      </Link>
      <div className="duration">
        <FontAwesomeIcon icon={faClock} /> {item.duration}
      </div>
      <AddToFavorite itemId={itemKey} />
      <h1>
        <Link to={`/recept/${itemKey}`}>{item.recipeName}</Link>
      </h1>
      <button
        className="addToList"
        onClick={() =>
          AddToShoppingList({ recipeId: itemKey, items: item.ingredients })
        }
        disabled={CheckShoppingList(itemKey)}
      >
        {CheckShoppingList(itemKey) ? (
          <span>
            toegevoegd <FontAwesomeIcon icon={faCheck} />
          </span>
        ) : (
          <span>
            lijstje <FontAwesomeIcon icon={faPlus} />
          </span>
        )}
      </button>
    </div>
  );
};

export default RecipeCard;
