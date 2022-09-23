import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  APIHandler,
  RecipeCard,
  RecipesFilter,
  StorageHandler,
} from "config/C4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";

const getAllRecipes = async (
  userId,
  callBack,
  callbackTwo,
  filteredRecipes
) => {
  const recipes = await APIHandler.getAllRecipes(userId);
  callBack(Object.entries(recipes));
  if (filteredRecipes.length <= 0) {
    callbackTwo(Object.entries(recipes));
  }
};

const RecipesView = () => {
  const [userId] = useState(StorageHandler.get("user"));
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [noneFoundError, setNoneFoundError] = useState(false);
  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [filters, setFilters] = useState({
    labelTypeDish: null,
    kitchen: null,
    duration: null,
    healthy: null,
  });

  useEffect(() => {
    getAllRecipes(userId, setAllRecipes, setFilteredRecipes, filteredRecipes);
  }, [userId, setAllRecipes, filteredRecipes]);

  const filterFunction = () => {
    setNoneFoundError(false);
    setLoadingRecipes(true);
    let filteredItems = [...allRecipes];
    Object.keys(filters).forEach((f, i) => {
      if (Object.values(filters)[i] !== null) {
        const items = Object.values(filteredItems).filter((r) => {
          return r[1][f] === Object.values(filters)[i];
        });
        filteredItems = items;
      }
    });

    if (filteredItems.length <= 0) {
      setLoadingRecipes(false);
      setNoneFoundError(true);
    }
    setFilteredRecipes(filteredItems);
    setLoadingRecipes(false);
  };

  const searchFunction = (e) => {
    const { value } = e.target;
    let filteredItems = [...allRecipes];
    if (value) {
      setNoneFoundError(false);
      setLoadingRecipes(true);
      filteredItems = filteredItems.filter((recipe) => {
        return recipe[1].recipeName.toLowerCase().includes(value.toLowerCase());
      });

      if (filteredItems.length <= 0) {
        setLoadingRecipes(false);
        setNoneFoundError(true);
      }
      setFilteredRecipes(filteredItems);
      setLoadingRecipes(false);
    } else if (value.length === 0) {
      filteredItems = [...allRecipes];
    }
  };

  if (!allRecipes.length > 0) {
    return (
      <div className="recipesView">
        <div className="recipesView__noRecipes">
          <h4>Oeps! Hier is nog niks te zien, want...</h4>
          <h1>Je hebt nog geen recepten toegevoegd.</h1>
          <div className="btn-wrapper">
            <Link to="/recept-toevoegen" className="btn">
              Recept toevoegen <FontAwesomeIcon icon={faPlus} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="recipesView">
      <div className="recipesView__wrapper container">
        <div className="recipesView__wrapper--filter">
          <h1>Filters</h1>
          <RecipesFilter
            filterFunction={filterFunction}
            filters={filters}
            setFilters={setFilters}
            allRecipes={allRecipes}
            filteredRecipes={filteredRecipes}
            searchFunction={searchFunction}
          />
        </div>
        <div className="recipesView__wrapper--items">
          {loadingRecipes && (
            <div className="loading">
              <FontAwesomeIcon icon={faSpinner} spin />
            </div>
          )}
          {!loadingRecipes &&
            !noneFoundError &&
            filteredRecipes.length > 0 &&
            filteredRecipes.map((recipe, i) => {
              const recipeKey = recipe[0];
              const recipeContent = recipe[1];
              return (
                <RecipeCard
                  key={i}
                  item={recipeContent}
                  itemKey={recipeKey}
                  clsn="recipesView__item"
                />
              );
            })}
          {noneFoundError && (
            <h1>
              Geen recepten gevonden met je zoekopdracht. Probeer iets anders te
              zoeken of <Link to="/recept-toevoegen">voeg een recept toe!</Link>
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipesView;
