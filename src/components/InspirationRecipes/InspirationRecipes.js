import React, { useEffect, useState } from "react";
import { APIHandler, RecipeCard, StorageHandler } from "config/C4";

const getAllRecipes = async (userId, callback) => {
  const allRecipes = await APIHandler.getAllRecipes(userId);
  callback(allRecipes);
};

const InspirationRecipes = ({ wrapper }) => {
  const [allRecipes, setAllRecipes] = useState({});
  const [userId] = useState(StorageHandler.get('user'));

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

  return (
    <div className={`inspirationRecipes ${wrapper}`}>
      {Object.values(allRecipes).length > 0 &&
        randomRecipe(0, Object.values(allRecipes).length).map((item, i) => (
          <RecipeCard
            key={i}
            item={Object.values(allRecipes)[item]}
            itemKey={Object.keys(allRecipes)[item]}
            clsn='inspirationRecipes__item'
          />
        ))}
    </div>
  );
};

export default InspirationRecipes;
