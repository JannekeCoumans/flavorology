import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APIHandler, RecipeCard, RecipesFilter } from "config/C4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const getAllRecipes = async (callBack, callbackTwo, filteredRecipes) => {
  const recipes = await APIHandler.getAllRecipes();
  callBack(recipes);
  if (Object.values(filteredRecipes).length <= 0) {
    callbackTwo(recipes);
  }
};

const RecipesView = () => {
  const [allRecipes, setAllRecipes] = useState({});
  const [filteredRecipes, setFilteredRecipes] = useState({});
  const [noneFoundError, setNoneFoundError] = useState(false);
  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [filters, setFilters] = useState({
    labelTypeDish: null,
    kitchen: null,
    duration: null,
    healthy: null,
  });

  useEffect(() => {
    getAllRecipes(setAllRecipes, setFilteredRecipes, filteredRecipes);
  }, [setAllRecipes, filteredRecipes]);

  const filterFunction = () => {
    setNoneFoundError(false);
    setLoadingRecipes(true);
    let filteredItems = {...allRecipes};
    console.log(filteredItems);
    Object.keys(filters).forEach((f, i) => {
      if (Object.values(filters)[i] !== null) {
        const items = (Object.values(filteredItems)).filter(
          (r) => r[f] === Object.values(filters)[i]
        );
        console.log(items)
        filteredItems = items;
      }
    });

    // if (filteredItems.length <= 0) {
    //   setLoadingRecipes(false);
    //   setNoneFoundError(true);
    // }
    // setFilteredRecipes(filteredItems);
    // setLoadingRecipes(false);
  };

  const searchFunction = (e) => {
    const { value } = e.target;
    let filteredItems = {...allRecipes};
    console.log(filteredItems);
    // if (value) {
    //   setNoneFoundError(false);
    //   setLoadingRecipes(true);
    //   filteredItems = Object.values(filteredItems).filter(recipe => {
    //     return recipe.recipeName.toLowerCase().includes(value.toLowerCase());
    //   });
    //   if (filteredItems.length <= 0) {
    //     setLoadingRecipes(false);
    //     setNoneFoundError(true);
    //   }
    //   setFilteredRecipes(filteredItems);
    //   setLoadingRecipes(false);
    // } else if (value.length === 0) {
    //   filteredItems = [...Object.values(allRecipes)];
    // }
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
            Object.values(filteredRecipes).length > 0 &&
            Object.values(filteredRecipes).map((recipe, i) => {
              return (
                <RecipeCard
                  key={i}
                  item={recipe}
                  itemKey={Object.keys(filteredRecipes)[i]}
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
