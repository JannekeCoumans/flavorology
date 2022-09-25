import React, { useEffect, useState } from "react";
import { APIHandler, Modal, RecipeSettings, StorageHandler } from "config/C4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faSpinner,
  faCheck,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const getAllIngredients = async (userId, callback) => {
  const allIngredients = await APIHandler.getAllIngredients(userId);
  callback(allIngredients);
};

const AddRecipeView = () => {
  const [userId] = useState(StorageHandler.get("user"));
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
  const [allIngredients, setAllIngredients] = useState(null);
  const [ingredientCount, setIngredientCount] = useState(1);
  const [preperationStepsCount, setPreperationStepsCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [recipeSaved, setRecipeSaved] = useState(false);
  const [savedRecipeId, setSavedRecipeId] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

    if (!id) {
      input.ingredients[index].ingredientName = value.toLowerCase();
    } else {
      input.ingredients[index][id] = value;
    }

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
    setLoading(true);
    APIHandler.addRecipe(userId, recipe).then((res) => {
      if (res && res.name) {
        setRecipeSaved(true);
        setSavedRecipeId(res.name);
        setLoading(false);
        setModalIsOpen(true);
      }
    });
  };

  useEffect(() => {
    if (!allIngredients) {
      getAllIngredients(userId, setAllIngredients);
    }
  }, [userId, allIngredients, setAllIngredients]);

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
        <select
          id="labelTypeDish"
          defaultValue={"default"}
          onChange={changeHandler}
        >
          <option value={"default"} disabled>
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
        <select id="kitchen" defaultValue={"default"} onChange={changeHandler}>
          <option value={"default"} disabled>
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
          <p>Hoeveel</p>
          <p>Eenheid</p>
          <p>Ingrediënt</p>
          <p>Type ingrediënt</p>
        </div>
        {[...Array(ingredientCount)].map((elem, index, { length }) => (
          <div key={index} className="row">
            <input
              type="number"
              id="quantity"
              placeholder="Quantity"
              onChange={(e) => addIngredient(e, index)}
            />
            <select
              id="quantityType"
              defaultValue={"default"}
              onChange={(e) => addIngredient(e, index)}
            >
              <option value={"default"} disabled>
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
              list="ingredientenList"
              placeholder="Start met typen om te zoeken"
              onChange={(e) => addIngredient(e, index)}
            />
            <datalist id="ingredientenList">
              {allIngredients &&
                allIngredients.map((ingredient, i) => (
                  <option key={i}>{ingredient}</option>
                ))
              }
            </datalist>
            <select
              id="ingredientType"
              defaultValue={"default"}
              onChange={(e) => addIngredient(e, index)}
            >
              <option value={"default"} disabled>
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
      <div className="btn-wrapper">
        <Link to="/" className="btn btn-inverse">
          Annuleren
        </Link>
        <button
          className="btn"
          onClick={() => handleSubmit()}
          disabled={loading || recipeSaved}
        >
          {!loading && !recipeSaved && "Opslaan"}
          {loading && <FontAwesomeIcon icon={faSpinner} spin />}
          {recipeSaved && (
            <span>
              Opgeslagen! <FontAwesomeIcon icon={faCheck} />
            </span>
          )}
        </button>
      </div>
      {modalIsOpen && (
        <Modal modalIsOpen={setModalIsOpen} clickOnBackground={false}>
          <div className="addRecipeModal">
            <h1>Recept is succesvol opgeslagen</h1>
            <Link to={`/recept/${savedRecipeId}`}>
              Bekijk je nieuwe recept <FontAwesomeIcon icon={faArrowRight} />
            </Link>
            <br />
            <br />
            <div
              onClick={() => window.location.reload()}
              className="btn btn-inverse"
            >
              Nog een recept toevoegen!
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AddRecipeView;
