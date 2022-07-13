import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faCarrot, faCutlery, faDrumstickBite, faFish, faSeedling, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const convertLabelTypeDish = (label) => {
  switch (label) {
    case "meat":
      return <span><FontAwesomeIcon icon={faDrumstickBite} /> vleesgerecht</span>;
    case "fish":
      return <span><FontAwesomeIcon icon={faFish} /> visgerecht</span>;
    case "vegetarian":
      return <span><FontAwesomeIcon icon={faCarrot} /> vegetarisch gerecht</span>;
    case "vegan":
      return <span><FontAwesomeIcon icon={faSeedling} /> veganistisch gerecht</span>;
    default:
      return "";
  }
};

const convertKitchen = (kitchen) => {
  switch (kitchen) {
    case "italian":
      return "italiaans";
    default:
      return "";
  }
};

const convertDuration = (duration) => {
  if (duration > 60) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return `${hours} uur en ${minutes} minuten`;
  } else {
    return `${duration} minuten`;
  }
};

const RecipeOverviewHeader = ({ item }) => {
  const {
    recipeName,
    duration,
    quantityPerson,
    labelTypeDish,
    kitchen,
    healthy,
    image,
  } = item;

  return (
    <header className="recipeOverviewHeader">
      <div className="recipeOverviewHeader__text">
        <h1>{recipeName}</h1>
        <div className="duration">
          <FontAwesomeIcon icon={faClock}/> {convertDuration(duration)}
        </div>
        <div className="quantityPerson">
          <FontAwesomeIcon icon={faUserGroup}/> {quantityPerson} personen
        </div>
        <div className="labels">
          <div className="label dish-type">
          {convertLabelTypeDish(labelTypeDish)}
          </div>
          <div className="label kitchen"><FontAwesomeIcon icon={faCutlery}/> {convertKitchen(kitchen)}</div>
          {healthy === 'true' && <div className="label healthy">gezond gerecht</div>}
        </div>
      </div>
      <div className="recipeOverviewHeader__image">
        <img src={image} alt={recipeName} />
      </div>
    </header>
  );
};

export default RecipeOverviewHeader;
