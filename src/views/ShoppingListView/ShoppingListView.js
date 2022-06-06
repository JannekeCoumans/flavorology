import React, { useEffect, useState } from "react";
import { RecipeSettings, StorageHandler } from "config/C4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const getList = async (callback) => {
  const list = await StorageHandler.get("shoppinglist");
  const { shoppingListOrder } = RecipeSettings;

  const orderForIndexVals = shoppingListOrder.slice(0).reverse();
  list.sort((a, b) => {
    const aIndex = -orderForIndexVals.indexOf(a.ingredientType);
    const bIndex = -orderForIndexVals.indexOf(b.ingredientType);
    return aIndex - bIndex;
  });

  console.log(list);

  callback(list);
};

const ShoppingListView = () => {
  const [list, setList] = useState([]);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    getList(setList);
  }, [setList]);

  const copyFunc = () => {
    const boodschappenlijstje = document.getElementById("textarea").value;
    navigator.clipboard.writeText(boodschappenlijstje);
    setIsCopied(true);
  };

  const deleteList = () => {
    StorageHandler.remove("shoppinglist");
    setList([]);
  };

  if (list && list.length > 0) {
    return (
      <div className="shoppingListView">
        <textarea
          id="textarea"
          width="200"
          height="200"
          defaultValue={list.map((i) => `${i.quantity} ${i.quantityType !== 'piece' ? i.quantityType : ''} ${i.ingredientName}\n`).join("")}
        />

        <div className="btn-wrapper">
          <button
            className="btn"
            onClick={() => copyFunc()}
            disabled={isCopied || (list && list.length <= 0)}
          >
            {isCopied ? (
              <span>
                <FontAwesomeIcon icon={faCheck} /> gekopieerd!
              </span>
            ) : (
              "Kopieër lijstje"
            )}
          </button>
          <button
            className="btn btn-inverse"
            onClick={() => {
              deleteList();
            }}
          >
            Verwijder lijstje
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="shoppingListView">
      <h4>Oeps! Hier is nog niks te zien, want...</h4>
      <h1>Je lijstje is nog leeg!</h1>
      <div className="btn-wrapper">
        <Link to="/recepten" className="btn">
          Bekijk recepten <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
    </div>
  );
};

export default ShoppingListView;
