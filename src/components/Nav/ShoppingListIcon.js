import { useEffect, useState } from "react";
import { ShoppinglistIsFilled } from "config/C4";

const { faList, faCheckCircle } = require("@fortawesome/free-solid-svg-icons");
const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");
const { Link } = require("react-router-dom/cjs/react-router-dom.min");

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
