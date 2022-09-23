import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

import { APIHandler, StorageHandler } from "config/C4";

const checkFavorite = async (userId, itemId, callback) => {
  const result = await APIHandler.checkFavorite(userId, itemId);
  if (result) {
    callback(result);
  }
  return;
};

const handleFavoriteClick = async (userId, itemId, bool, callback) => {
  if (bool) {
    await APIHandler.removeFavorite(userId, itemId);
    callback(false);
  } else {
    await APIHandler.addFavorite(userId, itemId);
    callback(true);
  }
}

const AddToFavorite = ({ itemId }) => {
  const [userId] = useState(StorageHandler.get('user'));
  const [isFavorited, setIsFavorited] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    checkFavorite(userId, itemId, setIsFavorited);
  }, [userId, itemId, setIsFavorited]);

  return (
    <div
      className="addToFavorite"
      onClick={() => handleFavoriteClick(userId, itemId, isFavorited, setIsFavorited)}
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
