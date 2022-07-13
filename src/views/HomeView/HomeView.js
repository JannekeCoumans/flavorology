import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { InspirationRecipes } from "config/C4";

const HomeView = () => {
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
      <div className="homeView__inspiration">
        <div className="homeView__inspiration--wrapper container">
          <h1 className="homeView__inspiration--title">Wat eten we vandaag?</h1>
          <p>Geen idee wat je wilt eten vandaag? Bekijk één van de willekeurig gekozen recepten hieronder, wellicht brengt je dat op ideeën.</p>

          <InspirationRecipes />
          {/* <InspirationRecipes wrapper='homeView__recipes--items' /> */}

          <Link to="/recepten" className="btn">
            Bekijk alle recepten <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
