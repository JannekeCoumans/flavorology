import React, { useEffect, useState } from "react";
import { APIHandler, RecipeCard, StorageHandler } from "config/C4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const getAllRecipes = async (userId, callback) => {
  const allRecipes = await APIHandler.getAllRecipes(userId);
  callback(allRecipes);
};

const InspirationRecipes = ({ wrapper }) => {
  const [allRecipes, setAllRecipes] = useState({});
  const [userId] = useState(StorageHandler.get("user"));

  useEffect(() => {
    getAllRecipes(userId, setAllRecipes);
  }, [setAllRecipes, userId]);

  const randomRecipe = (min, max) => {
    const numbers = [];
    for (let i = 0; i < 4; i++) {
      const newNumber = Math.floor(Math.random() * max) + min;
      if (numbers.length >= 1 && numbers.includes(newNumber)) {
        i--;
      } else {
        numbers.push(newNumber);
      }
    }
    return numbers;
  };

  const RandomRecipes = () => {
    if (Object.values(allRecipes).length >= 4) {
      return randomRecipe(0, Object.values(allRecipes).length).map(
        (item, i) => (
          <RecipeCard
            key={i}
            item={Object.values(allRecipes)[item]}
            itemKey={Object.keys(allRecipes)[item]}
            clsn="inspirationRecipes__item"
          />
        )
      );
    } else if (
      Object.values(allRecipes).length > 0 &&
      Object.values(allRecipes).length < 4
    ) {
      return Object.values(allRecipes).map((item, i) => (
        <RecipeCard
          key={i}
          item={item}
          itemKey={Object.keys(allRecipes)[i]}
          clsn="inspirationRecipes__item"
        />
      ));
    } else {
      return (
        <div className="recipesView__noRecipes">
          <h4>Oeps! Hier is nog niks te zien, want...</h4>
          <h1>Je hebt nog geen recepten toegevoegd.</h1>
          <div className="btn-wrapper">
            <Link to="/recept-toevoegen" className="btn">
              Recept toevoegen <FontAwesomeIcon icon={faPlus} />
            </Link>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={`inspirationRecipes ${wrapper}`}>
      <RandomRecipes />
    </div>
  );
};

export default InspirationRecipes;
