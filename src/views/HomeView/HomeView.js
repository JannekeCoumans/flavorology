import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { APIHandler, InspirationRecipes, StorageHandler } from "config/C4";

const getAllRecipes = async (userId, callback) => {
  const allRecipes = await APIHandler.getAllRecipes(userId);
  callback(allRecipes);
};

const HomeView = () => {
  const [userId] = useState(StorageHandler.get("user"));
  const [allRecipes, setAllRecipes] = useState(null);

  useEffect(() => {
    if (!allRecipes) {
      getAllRecipes(userId, setAllRecipes);
    }
  }, [userId, allRecipes, setAllRecipes]);

  return (
    <div className="homeView">
      <header className="homeView__header">
        <div className="container">
          <div className="homeView__header--text">
            <h1>
              Altijd je <span>éigen</span> favoriete
              <br /> recepten bij de hand.
            </h1>
            <div className="btn-wrapper">
              <Link to="/recepten" className="btn">
                Bekijk recepten <FontAwesomeIcon icon={faArrowRight} />
              </Link>
              <Link to="/recept-toevoegen" className="btn-flat white">
                Recept toevoegen <FontAwesomeIcon icon={faPlus} />
              </Link>
            </div>
          </div>
        </div>
      </header>
      {allRecipes && Object.values(allRecipes).length > 0 && (
        <div className="homeView__inspiration">
          <div className="homeView__inspiration--wrapper container">
            <h1 className="homeView__inspiration--title">
              Wat eten we vandaag?
            </h1>
            <p>
              Geen idee wat je wilt eten vandaag? Bekijk één van de willekeurig
              gekozen recepten hieronder, wellicht brengt je dat op ideeën.
            </p>

            <InspirationRecipes />

            <Link to="/recepten" className="btn">
              Bekijk alle recepten <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeView;
