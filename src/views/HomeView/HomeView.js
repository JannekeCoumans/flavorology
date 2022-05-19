import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faClock, faHeart } from "@fortawesome/free-regular-svg-icons";

import { APIHandler } from "config/C4";

const getAllRecipes = async (callback) => {
  const allRecipes = await APIHandler.getAllRecipes();
  callback(allRecipes);
};

const HomeView = () => {
  const [allRecipes, setAllRecipes] = useState({});

  useEffect(() => {
    getAllRecipes(setAllRecipes);
  }, [setAllRecipes]);

  const placeholderImage =
    "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg";

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
    <div className="homeView">
      <header className="homeView__header">
        <div className="container">
          <div className="homeView__header--text">
            <h1>
              Altijd je <span>éigen</span> favoriete
              <br /> recepten bij de hand.
            </h1>
            <Link to="/recept-toevoegen" className="btn">
              Recept toevoegen <FontAwesomeIcon icon={faPlus} />
            </Link>
          </div>
        </div>
      </header>
      <div className="homeView__recipes">
        <div className="homeView__recipes--wrapper container">
          <h1>Wat eten we vandaag?</h1>
          <div className="homeView__recipes--items">
            {Object.values(allRecipes).length > 0 &&
              randomRecipe(0, Object.values(allRecipes).length).map(
                (item, i) => (
                  <Link key={i} to={`/recept/${Object.keys(allRecipes)[item]}`}>
                    <img
                      src={
                        Object.values(allRecipes)[item].image || placeholderImage
                      }
                      alt=""
                      loading="lazy"
                    />
                    <div className="bg-overlay" />
                    <div className="duration">
                      <FontAwesomeIcon icon={faClock} />{" "}
                      {Object.values(allRecipes)[item].duration} min
                    </div>
                    <div className="favorite">
                      <FontAwesomeIcon icon={faHeart} />
                    </div>
                    <h1>{Object.values(allRecipes)[item].recipeName}</h1>
                  </Link>
                )
              )}
          </div>
          <Link to="/recepten" className="btn">
            Bekijk alle recepten <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
