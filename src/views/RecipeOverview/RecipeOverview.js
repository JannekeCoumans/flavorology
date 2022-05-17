import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import { AlterRecipe, APIHandler, Modal, RecipeOverviewHeader } from 'config/C4';

const convertQuantityType = (quantityType) => {
  switch (quantityType) {
    case "piece":
      return "";
    case "gram":
      return "gram";
    case "teaspoon":
      return "theelepel";
    default:
      return null;
  }
};

const generateListItemString = ({ name, quantity, quantityType }) => {
  const quantityTypeConverted = convertQuantityType(quantityType);
  if (quantityTypeConverted) {
    return `${quantity} ${quantityTypeConverted} ${name}`;
  }

  return `${quantity} ${name}`;
};

const getRecipe = async (id, callback) => {
  const recipe = await APIHandler.getRecipe(id);
  console.log(recipe);
  callback(recipe);
}

const RecipeOverview = () => {
  const [recipe, setRecipe] = useState({});
  const [listItems, setListItems] = useState([]);
  const [ modal, openModal ] = useState(false);

  const { ingredients, preperationSteps } = recipe;

  useEffect(() => {
    const { pathname } = window.location;
    const recipeId = pathname.split('/recept/')[1];
    getRecipe(recipeId, setRecipe);
  }, [setRecipe]);

  // function to add or remove item from shoppinglist
  const changeListItems = (e) => {
    const { name } = e.target;
    const itemInList = listItems.some((listItem) => listItem.name === name);
    if (itemInList) {
      const index = listItems.findIndex((listItem) => listItem.name === name);
      const updatedListItems = listItems;
      updatedListItems.splice(index, 1);
      setListItems(updatedListItems);
    } else {
      const updatedListItems = listItems;
      const itemToAdd = ingredients.filter(
        (ingredient) => ingredient.name === name
      );
      updatedListItems.push(itemToAdd[0]);
      setListItems(updatedListItems);
    }
  };

  // function to check if checkbox is checked
  const itemIsInList = (item) => {
    if (listItems.length > 0) {
      const itemInList = listItems.filter(
        (listItem) => listItem.name === item.name
      );
      return itemInList.length > 0;
    }
  };

  return (
    <div className="recipeOverview">
      <RecipeOverviewHeader item={recipe} />
      <section className="recipeOverview__content">
        <div className="recipeOverview__content--ingredients">
          <h1 className="sectionTitle">Ingrediënten</h1>
          <ul>
            {recipe && ingredients && ingredients.map((item, i) => (
              <li key={i}>
                <input
                  type="checkbox"
                  name={item.name}
                  id={generateListItemString(item)}
                  onChange={changeListItems}
                  checked={itemIsInList(item)}
                />
                
                <span className="quantity">
                    {item.quantity} {convertQuantityType(item.quantityType)}
                  </span>
                  <span className="name">&nbsp;{item.name}</span>
              </li>
            ))}
          </ul>

          <button>Toevoegen aan boodschappenlijstje</button>
        </div>
        <div className="recipeOverview__content--preperation-steps">
          <h1>Let's get cooking</h1>
          {recipe && preperationSteps && preperationSteps.map((item, i) => (
            <div key={i} className="step">
              <div className="number">
                <span>{i + 1}</span>
              </div>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>
      <button className="alterRecipeButton" onClick={() => openModal(!modal)}>
        <FontAwesomeIcon icon={faPen} />
      </button>

      {modal && (
        <Modal modalIsOpen={openModal}>
          <AlterRecipe recipe={recipe} modalIsOpen={openModal} />
        </Modal>
      )}
    </div>
  );
};

export default RecipeOverview;
