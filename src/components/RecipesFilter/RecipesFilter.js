import React, { useCallback, useEffect, useState } from "react";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { RecipeSettings } from "config/C4";

const RecipesFilter = ({ filterFunction, filters, setFilters, allRecipes, searchFunction }) => {
  const [allDurations, setAllDurations] = useState([]);
  const [allKitchenTypes, setAllKitchenTypes] = useState([]);
  const [allDishTypes, setAllDishTypes] = useState([]);

  const getAllDurations = useCallback(() => {
    const durations = [];
    Object.values(allRecipes).forEach((recipe) => {
      if (durations.length === 0 || !durations.includes(recipe.duration)) {
        durations.push(recipe.duration);
      }
    });
    durations.sort((a, b) => a - b);
    return durations;
  }, [allRecipes]);

  const getAllKitchenTypes = useCallback(() => {
    const kitchenTypes = [];
    Object.values(allRecipes).forEach((recipe) => {
      if (kitchenTypes.length === 0 || !kitchenTypes.includes(recipe.kitchen)) {
        kitchenTypes.push(recipe.kitchen);
      }
    });
    kitchenTypes.sort((a, b) => a - b);
    return kitchenTypes;
  }, [allRecipes]);

  const getAllDishTypes = useCallback(() => {
    const dishTypes = [];
    Object.values(allRecipes).forEach((recipe) => {
      if (dishTypes.length === 0 || !dishTypes.includes(recipe.labelTypeDish)) {
        dishTypes.push(recipe.labelTypeDish);
      }
    });
    dishTypes.sort((a, b) => a - b);
    return dishTypes;
  }, [allRecipes]);

  useEffect(() => {
    setAllDurations(() => getAllDurations());
    setAllKitchenTypes(() => getAllKitchenTypes());
    setAllDishTypes(() => getAllDishTypes());
  }, [
    setAllDishTypes,
    getAllDishTypes,
    setAllKitchenTypes,
    getAllKitchenTypes,
    getAllDurations,
  ]);

  const resetFilters = () => {
    window.location.reload();
  };

  const handleChange = (e) => {
    const { id, value, checked } = e.target;
    const object = filters;
    if (value === "unset") {
      object[id] = null;
    } else if (id === "healthy") {
      if (checked === true) object[id] = "true";
      if (checked === false) object[id] = null;
    } else {
      object[id] = value;
    }
    setFilters(object);
    filterFunction();
  };

  return (
    <div className="recipesFilter">
      <div className="search-input">
        <FontAwesomeIcon icon={faSearch} />
        <input type="text" placeholder="Search" onChange={searchFunction}/>
      </div>
      <label>
        Soort gerecht
        <select id="labelTypeDish" onChange={handleChange}>
          <option value="unset">Niks geselecteerd</option>
          {allDishTypes.length > 0 &&
            allDishTypes.map((type, i) => {
              if (type && type !== "") {
                const filteredDish = RecipeSettings.dishTypes.filter((dish) => {
                  return dish.shortName === type;
                })[0];
                return (
                  <option key={i} value={filteredDish.shortName}>
                    {filteredDish.longName}
                  </option>
                );
              }
              return null;
            })}
        </select>
      </label>
      <label>
        Regio
        <select id="kitchen" onChange={handleChange}>
          <option value="unset">Niks geselecteerd</option>
          {allKitchenTypes.length > 0 &&
            allKitchenTypes.map((type, i) => {
              const filteredKitchen = RecipeSettings.kitchenTypes.filter(
                (kitchen) => {
                  return kitchen.shortName === type;
                }
              )[0];
              return (
                <option key={i} value={filteredKitchen.shortName}>
                  {filteredKitchen.longName}
                </option>
              );
            })}
        </select>
      </label>
      <label>
        Aantal minuten
        <select id="duration" onChange={handleChange}>
          <option value="unset">Niks geselecteerd</option>
          {allDurations.length > 0 &&
            allDurations.map((duration, i) => (
              <option key={i} value={duration}>
                {duration} minuten
              </option>
            ))}
        </select>
      </label>
      <label>
        Gezond gerecht
        <span>
          <input type="checkbox" id="healthy" onChange={handleChange} /> Ja
        </span>
      </label>
      <button className="btn" onClick={() => resetFilters()}>
        <FontAwesomeIcon icon={faTimes} />
        &nbsp; Filters wissen
      </button>
    </div>
  );
};

export default RecipesFilter;
