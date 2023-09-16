import React, { useCallback, useEffect, useState } from "react";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { RecipeSettings } from "config/C4";

const RecipesFilter = ({
  filterFunction,
  filters,
  setFilters,
  allRecipes,
  searchFunction,
}) => {
  const [allDurations, setAllDurations] = useState([]);
  const [allKitchenTypes, setAllKitchenTypes] = useState([]);
  const [allDishTypes, setAllDishTypes] = useState([]);

  const getAllDurations = useCallback(() => {
    const durations = [];
    if (allRecipes.length > 0) {
      allRecipes.forEach((recipe) => {
        if (durations.length === 0 || !durations.includes(recipe[1].duration)) {
          durations.push(recipe[1].duration);
        }
      });
      durations.sort((a, b) => a - b);
    }
    return durations;
  }, [allRecipes]);

  const getAllKitchenTypes = useCallback(() => {
    const kitchenTypes = [];

    if (allRecipes.length > 0) {
      allRecipes.forEach((recipe) => {
        if (
          kitchenTypes.length === 0 ||
          !kitchenTypes.includes(recipe[1].kitchen)
        ) {
          kitchenTypes.push(recipe[1].kitchen);
        }
      });
      kitchenTypes.sort((a, b) => a - b);
      return kitchenTypes;
    }
  }, [allRecipes]);

  const getAllDishTypes = useCallback(() => {
    const dishTypes = [];
    if (allRecipes.length > 0) {
      allRecipes.forEach((recipe) => {
        if (
          dishTypes.length === 0 ||
          !dishTypes.includes(recipe[1].labelTypeDish)
        ) {
          dishTypes.push(recipe[1].labelTypeDish);
        }
      });
    }
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
        <input type="text" placeholder="Search" onChange={searchFunction} />
      </div>
      <label>
        Soort gerecht
        <div className="selectWrapper">
          <select id="labelTypeDish" onChange={handleChange}>
            <option value="unset">Niks geselecteerd</option>
            {allDishTypes &&
              allDishTypes.length > 0 &&
              allDishTypes.map((type, i) => {
                if (type && type !== "") {
                  const filteredDish = RecipeSettings.dishTypes.filter(
                    (dish) => {
                      if (dish.shortName) {
                        return dish.shortName === type;
                      }
                      return null;
                    }
                  )[0];
                  if (filteredDish.shortName) {
                    console.log(filteredDish.shortName);
                    return (
                      <option key={i} value={filteredDish.shortName}>
                        {filteredDish.longName}
                      </option>
                    );
                  }
                }
                return null;
              })}
          </select>
        </div>
      </label>
      <label>
        Regio
        <div className="selectWrapper">
          <select id="kitchen" onChange={handleChange}>
            <option value="unset">Niks geselecteerd</option>
            {allKitchenTypes &&
              allKitchenTypes.length > 0 &&
              allKitchenTypes.map((type, i) => {
                const filteredKitchen = RecipeSettings.kitchenTypes.filter(
                  (kitchen) => {
                    if (kitchen.shortName) {
                      return kitchen.shortName === type;
                    }
                    return null;
                  }
                )[0];
                if (filteredKitchen && filteredKitchen.shortName) {
                  return (
                    <option key={i} value={filteredKitchen.shortName}>
                      {filteredKitchen.longName}
                    </option>
                  );
                }
                return null;
              })}
          </select>
        </div>
      </label>
      <label>
        Aantal minuten
        <div className="selectWrapper">
          <select id="duration" onChange={handleChange}>
            <option value="unset">Niks geselecteerd</option>
            {allDurations &&
              allDurations.length > 0 &&
              allDurations.map((duration, i) => (
                <option key={i} value={duration}>
                  {duration} minuten
                </option>
              ))}
          </select>
        </div>
      </label>
      <label>
        <span>
          <input type="checkbox" id="healthy" onChange={handleChange} /> Gezond
          gerecht?
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
