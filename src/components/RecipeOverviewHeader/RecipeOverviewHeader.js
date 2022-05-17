import React from "react";

const convertLabelTypeDish = (label) => {
  switch (label) {
    case "meat":
      return "vleesgerecht";
    case "fish":
      return "visgerecht";
    case "vegetarian":
      return "vegetarisch gerecht";
    case "vegan":
      return "veganistisch gerecht";
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
        <div className="duration">{convertDuration(duration)}</div>
        <div className="quantityPerson">{quantityPerson} personen</div>
        <div className="labels">
          <div className="label dish-type">
            {convertLabelTypeDish(labelTypeDish)}
          </div>
          <div className="label kitchen">{convertKitchen(kitchen)}</div>
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
