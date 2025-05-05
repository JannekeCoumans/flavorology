import { useEffect, useState } from "react";
import { ShoppinglistIsFilled } from "config/C4";
import { Link } from "react-router-dom";

const { faList, faCheckCircle } = require("@fortawesome/free-solid-svg-icons");
const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");

const ShoppingListItem = () => {
  const [listIsFilled, setListIsFilled] = useState(false);

  const getShoppingList = async (callback) => {
    const shoppinglist = await ShoppinglistIsFilled();
    callback(shoppinglist);
  };

  useEffect(() => {
    getShoppingList(setListIsFilled);
  }, [setListIsFilled]);

  return (
    <Link to="/boodschappenlijstje" className="icon list">
      <span className="icon-box">
        <FontAwesomeIcon icon={faList} />
        {listIsFilled && (
          <div className="badge">
            <FontAwesomeIcon icon={faCheckCircle} />
          </div>
        )}
      </span>
    </Link>
  );
};

export default ShoppingListItem;
