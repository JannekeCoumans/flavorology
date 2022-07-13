import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

import { APIHandler } from "config/C4";

const checkFavorite = async (id, callback) => {
  const result = await APIHandler.checkFavorite(id);
  if (result) {
    callback(result);
  }
  return;
};

const handleFavoriteClick = async (id, bool, callback) => {
  if (bool) {
    await APIHandler.removeFavorite(id);
    callback(false);
  } else {
    await APIHandler.addFavorite(id);
    callback(true);
  }
}

const AddToFavorite = ({ itemId }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    checkFavorite(itemId, setIsFavorited);
  }, [itemId, setIsFavorited]);

  return (
    <div
      className="addToFavorite"
      onClick={() => handleFavoriteClick(itemId, isFavorited, setIsFavorited)}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isFavorited || isHovered ? (
        <FontAwesomeIcon icon={faHeart} />
      ) : (
        <FontAwesomeIcon icon={faHeartRegular} />
      )}
    </div>
  );
};

export default AddToFavorite;
