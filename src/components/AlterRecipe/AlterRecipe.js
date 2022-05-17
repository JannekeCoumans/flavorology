import React, { useState } from "react";
import { AlertPopup } from 'config/C4';

const AlterRecipe = ({ recipe, modalIsOpen }) => {
  const {
    name,
    quantityPerson,
    duration,
    labelTypeDish,
    kitchen,
    healthy,
    image,
    ingredients,
    preperationSteps,
  } = recipe;

  const [ startedEditing, setStartedEditing ] = useState(false);
  const [ alertPopup, setAlertPopup ] = useState(false);

  const dishTypes = [
    {
      shortName: 'meat',
      longName: 'Vleesgerecht',
    },
    {
      shortName: 'fish',
      longName: 'Visgerecht',
    },
    {
      shortName: 'vegetarian',
      longName: 'Vegetarisch gerecht',
    },
    {
      shortName: 'vegan',
      longName: 'Veganistisch gerecht',
    },
  ];

  const kitchenTypes = [
    {
      shortName: 'french',
      longName: 'Frans',
    },
    {
      shortName: 'italian',
      longName: 'Italiaans',
    },
    {
      shortName: 'thai',
      longName: 'Thais',
    },
    {
      shortName: 'chinese',
      longName: 'Chinees',
    },
    {
      shortName: 'mexican',
      longName: 'Mexicaans',
    }
  ];

  const quantityTypes = [
    {      
      shortName: 'piece',
      longName: 'stuks',
    },
    {      
      shortName: 'gram',
      longName: 'gram',
    },
    {      
      shortName: 'teaspoon',
      longName: 'theelepel',
    },
  ]

  const changeHandler = (e) => {
    if (!startedEditing) setStartedEditing(true);
    console.log(e.target.id);
  }

  return (
    <div className="alterRecipe">
      <div className="alterRecipe__header">
        <h1>Recept aanpassen</h1>
        <div className="alterRecipe__header--buttons">
          <button>Opslaan</button>
          <button onClick={() => setAlertPopup(true)}>Annuleren</button>
        </div>
      </div>
      <div className="alterRecipe__content">

        <h2>Info van het recept</h2>
        <div className="alterRecipe__content--item">
          <label htmlFor="name">Titel</label>
          <input type="text" defaultValue={name} id="name" onChange={changeHandler}/>
        </div>
        <div className="alterRecipe__content--item">
          <label htmlFor="quantityPerson">Hoeveelheid personen</label>
          <input type="number" defaultValue={quantityPerson} id="quantityPerson" onChange={changeHandler}/>
        </div>
        <div className="alterRecipe__content--item">
          <label htmlFor="duration">Bereidingstijd in minuten</label>
          <input type="number" defaultValue={duration} id="duration" onChange={changeHandler}/>
        </div>
        <div className="alterRecipe__content--item">
          <label htmlFor="labelTypeDish">Soort gerecht</label>
          <select id="labelTypeDish" onChange={changeHandler} value={labelTypeDish}>
            {dishTypes.map((type, index) => {
              return <option key={index} value={type.shortName}>{type.longName}</option>
            })}
          </select>
        </div>
        <div className="alterRecipe__content--item">
          <label htmlFor="kitchen">Afkomst van het gerecht</label>
          <select id="kitchen" onChange={changeHandler} value={kitchen}>
            {kitchenTypes.map((type, index) => {
              return <option key={index} value={type.shortName}>{type.longName}</option>
            })}
          </select>
        </div>
        <div className="alterRecipe__content--item">
          Is het een gezond gerecht?
          <input type="radio" checked={healthy} id="healthy" value={true} onChange={changeHandler}/>
          Ja
          <input type="radio" checked={!healthy} id="healthy" value={false} onChange={changeHandler}/>
          Nee
        </div>
        <div className="alterRecipe__content--item">
          <label htmlFor="image">Afbeelding aanpassen</label>
          <img src={image} alt="" width="200"/>
          <input type="text" defaultValue={image} id="image" onChange={changeHandler}/>
        </div>

        <hr />

        <h2>Ingrediënten wijzigen, verwijderen of toevoegen</h2>

        {ingredients.map((item, i) => {
          return (
            <div key={i} className="ingredient">
              <input type="number" defaultValue={item.quantity} />
              <select id="quantityType" value={item.quantityType} onChange={changeHandler}>
                {quantityTypes.map((type, index) => {
                  return <option key={index} value={type.shortName}>{type.longName}</option>
                })}
              </select>
              <input type="text" defaultValue={item.name} />
            </div>
          )
        })}

        <hr />
        
        <h2>Bereidingswijze wijzigen</h2>

        {preperationSteps.map((step, i) => {
          return (
            <div key={i} className="step">
              <div className="number">
                Stap {i + 1}
              </div>
              <textarea defaultValue={step}></textarea>
            </div>
          )
        })}
      </div>
      {alertPopup && (
        <AlertPopup
          cancelFunction={() => setAlertPopup(false)}
          cancelText='Verder met wijzigen van het recept'
          continueFunction={() => modalIsOpen(false)}
          continueText='Stoppen met wijzigen van het recept'
          title='Er zijn onopgeslagen wijzigingen'
          text='Weet je zeker dat je wilt annuleren? Je wijzigingen worden niet opgeslagen'
        />
      )}
    </div>
  );
};

export default AlterRecipe;
