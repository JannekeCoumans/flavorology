import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";

import { APIHandler, RecipeCard, StorageHandler } from "config/C4";

const getAllFavorites = async (userId, callback, setLoading) => {
  const favorites = await APIHandler.getAllFavorites(userId);
  if (favorites) {
    const recipes = await APIHandler.getAllRecipes(userId);
    const favoriteRecipes = Object.values(favorites).map((favorite) =>
      Object.entries(recipes).filter((recipe) => recipe[0] === favorite)
    );
    callback(favoriteRecipes);
    setLoading(false);
  }
  setLoading(false);
};

const FavoritesView = () => {
  const [userId] = useState(StorageHandler.get('user'));
  const [favoriteRecipes, setFavoriteRecipes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!favoriteRecipes) {
      getAllFavorites(userId, setFavoriteRecipes, setLoading);
    }
  }, [favoriteRecipes]);

  if (loading) {
    return (
      <div className="loading">
        <FontAwesomeIcon icon={faCircleNotch} spin />
      </div>
    );
  }

  if (favoriteRecipes) {
    return (
      <div className="favoritesView container">
        <h1 className="favoritesView__title">Jouw favorieten</h1>
        <div className="favoritesView__items">
          {favoriteRecipes &&
            favoriteRecipes.map((item, i) => {
              return (
                <RecipeCard
                  key={i}
                  item={item[0][1]}
                  itemKey={item[0][0]}
                  clsn="recipesView__item"
                />
              );
            })}
        </div>
        <div className="btn-wrapper">
            <Link to="/recepten" className="btn">
              Bekijk alle recepten <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
      </div>
    );
  }
  
  return (
    <div className="favoritesView">
      {!loading && (
        <div className="favoritesView__noFavorites">
          <h4>Oeps! Hier is nog niks te zien, want...</h4>
          <h1>Je hebt nog geen recepten als favoriet geselecteerd!</h1>
          <div className="btn-wrapper">
            <Link to="/recepten" className="btn">
              Bekijk recepten <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesView;
