import React, { useEffect, useState } from "react";
import { AlertPopup, APIHandler, RecipeSettings } from "config/C4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faSpinner } from "@fortawesome/free-solid-svg-icons";

const addRecipe = (recipe, callback) => {
  callback(recipe);
};

const AlterRecipe = ({ recipe, modalIsOpen, recipeId }) => {
  const [startedEditing, setStartedEditing] = useState(false);
  const [alertPopup, setAlertPopup] = useState(false);
  const [alteredRecipe, setAlteredRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    addRecipe(recipe, setAlteredRecipe);
  }, [alteredRecipe, setAlteredRecipe, recipe]);

  const changeHandler = (e) => {
    if (!startedEditing) setStartedEditing(true);
    const { id, value } = e.target;
    const input = recipe;
    input[id] = value;
    setAlteredRecipe(input);
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
    setAlteredRecipe(input);
  };

  const addEmptyIngredient = () => {
    const obj = alteredRecipe;
    obj.ingredients.push({
      ingredientType: "",
      ingredientName: "",
      quantity: null,
      quantityType: "",
    });
    setAlteredRecipe({...obj});
  }

  const adjustIngredientCount = (direction) => {
    const obj = alteredRecipe;
    if (direction === "+") {
      addEmptyIngredient();
    } else {
      obj.ingredients.pop();
      setAlteredRecipe({...obj});
    }
  };

  const addEmptyPrepStep = () => {
    const obj = alteredRecipe;
    obj.preperationSteps.push("");
    setAlteredRecipe({...obj});
  }

  const addPrepStep = (e, index) => {
    const { value } = e.target;
    const input = recipe;
    if (!input.preperationSteps[index]) {
      input.preperationSteps.push("");
    }

    input.preperationSteps[index] = value;
    setAlteredRecipe(input);
  };

  const adjustStepCount = (direction) => {
    const obj = alteredRecipe;
    if (direction === "+") {
      addEmptyPrepStep();
    } else {
      obj.preperationSteps.pop();
      setAlteredRecipe({...obj});
    }
  };

  const saveRecipe = async () => {
    setLoading(true);
    await APIHandler.editRecipe(recipeId, alteredRecipe);
    setLoading(false);
    alert('Recept is succesvol aangepast');
    modalIsOpen(false);
  };

  if (alteredRecipe !== null && Object.values(alteredRecipe).length > 0) {
    const {
      duration,
      healthy,
      image,
      ingredients,
      kitchen,
      labelTypeDish,
      preperationSteps,
      quantityPerson,
      recipeName,
    } = alteredRecipe;
    return (
      <div className="alterRecipe">
        <div className="alterRecipe__header">
          <h1>Recept aanpassen</h1>
          <div className="alterRecipe__header--buttons">
            <button className="btn" onClick={() => saveRecipe()}>
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                'Opslaan'
              )}
            </button>
            <button
              className="btn btn-inverse"
              onClick={() => {
                startedEditing ? setAlertPopup(true) : modalIsOpen(false)}}
            >
              Annuleren
            </button>
          </div>
        </div>
        <div className="alterRecipe__content">
          <h1>Basis info recept</h1>
          <div className="row">
            <label htmlFor="recipeName">Titel</label>
            <input
              type="text"
              id="recipeName"
              placeholder="Titel van het recept"
              defaultValue={recipeName}
              onChange={changeHandler}
            />
          </div>
          <div className="row">
            <label htmlFor="quantityPerson">Hoeveelheid personen</label>
            <input
              type="number"
              id="quantityPerson"
              placeholder="Hoeveelheid personen"
              defaultValue={quantityPerson}
              onChange={changeHandler}
            />
          </div>
          <div className="row">
            <label htmlFor="duration">Bereidingstijd in minuten</label>
            <input
              type="number"
              id="duration"
              placeholder="Bereidingstijd in minuten"
              defaultValue={duration}
              onChange={changeHandler}
            />
          </div>
          <div className="row">
            <label htmlFor="labelTypeDish">Soort gerecht</label>
            <select
              id="labelTypeDish"
              onChange={changeHandler}
              value={labelTypeDish}
            >
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
            <select id="kitchen" onChange={changeHandler} value={kitchen}>
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
                  checked={healthy === "true"}
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
                  checked={healthy === "false"}
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
              defaultValue={image}
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
            {ingredients && ingredients.length > 0 ?
              ingredients.map((item, index, { length }) => (
                <div key={index} className="row">
                  <input
                    type="number"
                    id="quantity"
                    onChange={(e) => addIngredient(e, index)}
                    defaultValue={item.quantity}
                  />
                  <select
                    id="quantityType"
                    onChange={(e) => addIngredient(e, index)}
                    defaultValue={item.quantityType}
                  >
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
                    defaultValue={item.ingredientName}
                  />
                  <select
                    id="ingredientType"
                    onChange={(e) => addIngredient(e, index)}
                    defaultValue={item.ingredientType}
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
                      <button onClick={() => adjustIngredientCount("-")}>
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                    </div>
                  )}
                </div>
              )) : <div/>}
          </div>
          <h1>Bereidingsstappen</h1>
          <div className="preperationSteps">
            {preperationSteps &&
              preperationSteps.length > 0 &&
              preperationSteps.map((item, index, { length }) => (
                <div key={index} className="row">
                  <div className="stepNumber">Stap nummer {index + 1}</div>
                  <textarea
                    onChange={(e) => addPrepStep(e, index)}
                    defaultValue={item}
                  />
                  {length - 1 === index && (
                    <div className="adjustStepCount">
                      <button onClick={() => adjustStepCount("+")}>
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                      <button
                        onClick={() => adjustStepCount("-")}
                        disabled={preperationSteps.length <= 0}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
          {alertPopup && (
            <AlertPopup
              cancelFunction={() => setAlertPopup(false)}
              cancelText="Verder met wijzigen van het recept"
              continueFunction={() => modalIsOpen(false)}
              continueText="Stoppen met wijzigen van het recept"
              title="Er zijn onopgeslagen wijzigingen"
              text="Weet je zeker dat je wilt annuleren? Je wijzigingen worden niet opgeslagen"
            />
          )}
        </div>
      </div>
    );
  }

  return (
    
    <div className="alterRecipe"/>
  )
};

export default AlterRecipe;
