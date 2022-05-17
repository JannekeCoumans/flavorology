import React, { useState } from "react";
import { APIHandler, RecipeSettings } from "config/C4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const AddRecipeView = () => {
  const [recipe, setRecipe] = useState({
    recipeName: "",
    quantityPerson: null,
    duration: null,
    labelTypeDish: "",
    kitchen: "",
    healthy: false,
    image: "",
    ingredients: [
      {
        ingredientType: "",
        ingredientName: "",
        quantity: null,
        quantityType: "",
      },
    ],
    preperationSteps: [""],
  });
  const [ingredientCount, setIngredientCount] = useState(1);
  const [preperationStepsCount, setPreperationStepsCount] = useState(1);
  // const placeholderImage =
  //   "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg";

  const changeHandler = (e) => {
    const { id, value } = e.target;
    const input = recipe;
    input[id] = value;
    setRecipe(input);
  };

  const addIngredient = (e, index) => {
    const { id, value } = e.target;
    const input = recipe;
    if (!input.ingredients[index]) {
      input.ingredients.push({
        ingredientType: "",
        ingredientName: "",
        quantity: null,
        quantityType: "",
      });
    }

    input.ingredients[index][id] = value;
    setRecipe(input);
  };

  const adjustIngredientCount = (direction) => {
    if (direction === "+") {
      setIngredientCount(ingredientCount + 1);
    } else {
      setIngredientCount(ingredientCount - 1);
    }
  };

  const addPrepStep = (e, index) => {
    const { value } = e.target;
    const input = recipe;
    if (!input.preperationSteps[index]) {
      input.preperationSteps.push("");
    }

    input.preperationSteps[index] = value;
    setRecipe(input);
  };

  const adjustStepCount = (direction) => {
    if (direction === "+") {
      setPreperationStepsCount(preperationStepsCount + 1);
    } else {
      setPreperationStepsCount(preperationStepsCount - 1);
      const input = recipe;
      input.preperationSteps.pop();
    }
  };

  const handleSubmit = () => {
    APIHandler.addRecipe(recipe);
  };

  return (
    <div className="addRecipeView">
      <h1>Basis info recept</h1>
      <div className="row">
        <label htmlFor="name">Titel</label>
        <input
          type="text"
          id="recipeName"
          placeholder="Titel van het recept"
          onChange={changeHandler}
        />
      </div>
      <div className="row">
        <label htmlFor="quantityPerson">Hoeveelheid personen</label>
        <input
          type="number"
          id="quantityPerson"
          placeholder="Hoeveelheid personen"
          onChange={changeHandler}
        />
      </div>
      <div className="row">
        <label htmlFor="duration">Bereidingstijd in minuten</label>
        <input
          type="number"
          id="duration"
          placeholder="Bereidingstijd in minuten"
          onChange={changeHandler}
        />
      </div>
      <div className="row">
        <label htmlFor="labelTypeDish">Soort gerecht</label>
        <select id="labelTypeDish" onChange={changeHandler}>
          <option disabled selected>
            Maak een keuze
          </option>
          {RecipeSettings.dishTypes.map((type, index) => {
            return (
              <option key={index} value={type.shortName}>
                {type.longName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="row">
        <label htmlFor="kitchen">Afkomst van het gerecht</label>
        <select id="kitchen" onChange={changeHandler}>
          <option disabled selected>
            Maak een keuze
          </option>
          {RecipeSettings.kitchenTypes.map((type, index) => {
            return (
              <option key={index} value={type.shortName}>
                {type.longName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="row">
        Is het een gezond gerecht?
        <div>
          <label>
            <input
              type="radio"
              id="healthy"
              name="healthy"
              value={true}
              onChange={changeHandler}
            />
            Ja
          </label>
          <label>
            <input
              type="radio"
              id="healthy"
              name="healthy"
              value={false}
              onChange={changeHandler}
            />
            Nee
          </label>
        </div>
      </div>
      <div className="row">
        <label htmlFor="image">Afbeelding toevoegen</label>
        <input
          type="text"
          id="image"
          placeholder="Plaats de URL van de afbeelding"
          onChange={changeHandler}
        />
      </div>
      <h1>Ingrediënten</h1>
      <div className="ingredients">
        <div className="row">
          <p>Hoeveelheid</p>
          <p>Eenheid</p>
          <p>Ingrediënt</p>
          <p>Type ingrediënt</p>
        </div>
        {[...Array(ingredientCount)].map((elem, index, { length }) => (
          <div key={index} className="row">
            <input
              type="number"
              id="quantity"
              onChange={(e) => addIngredient(e, index)}
            />
            <select id="quantityType" onChange={(e) => addIngredient(e, index)}>
              <option disabled selected>
                Maak een keuze
              </option>
              {RecipeSettings.quantityTypes.map((type, index) => {
                return (
                  <option key={index} value={type.shortName}>
                    {type.longName}
                  </option>
                );
              })}
            </select>
            <input
              type="text"
              id="ingredientName"
              onChange={(e) => addIngredient(e, index)}
            />
            <select
              id="ingredientType"
              onChange={(e) => addIngredient(e, index)}
            >
              <option disabled selected>
                Maak een keuze
              </option>
              {RecipeSettings.ingredientType.map((type, index) => {
                return (
                  <option key={index} value={type.shortName}>
                    {type.longName}
                  </option>
                );
              })}
            </select>
            {length - 1 === index && (
              <div className="adjustIngredientCount">
                <button onClick={() => adjustIngredientCount("+")}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
                <button
                  onClick={() => adjustIngredientCount("-")}
                  disabled={ingredientCount <= 1}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <h1>Bereidingsstappen</h1>
      <div className="preperationSteps">
        {[...Array(preperationStepsCount)].map((elem, index, { length }) => (
          <div key={index} className="row">
            <div className="stepNumber">Stap nummer {index + 1}</div>
            <textarea onChange={(e) => addPrepStep(e, index)} />
            {length - 1 === index && (
              <div className="adjustStepCount">
                <button onClick={() => adjustStepCount("+")}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
                <button
                  onClick={() => adjustStepCount("-")}
                  disabled={preperationStepsCount <= 1}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <button>Annuleren</button>
      <button onClick={() => handleSubmit()}>Opslaan</button>
    </div>
  );
};

export default AddRecipeView;
