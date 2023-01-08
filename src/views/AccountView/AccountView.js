import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faPencil,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

import { APIHandler, EditAccount, Modal, StorageHandler } from "config/C4";

const getUserInfo = async (userId, callback) => {
  const userInfo = await APIHandler.getUserInfo(userId);
  if (userInfo) callback(userInfo);
};

const getUserInitials = (name) => {
  return name
    .toUpperCase()
    .split(" ")
    .map((n) => n[0]);
};

const AccountView = () => {
  const [userId] = useState(StorageHandler.get("user"));
  const [userInfo, setUserInfo] = useState(null);
  const [modal, openModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const logoutUser = () => {
    setLoading(true);
    StorageHandler.remove("user");
    window.location.href = "/";
    setLoading(false);
  };

  useEffect(() => {
    if (!userInfo) getUserInfo(userId, setUserInfo);
  }, [userId, userInfo]);

  if (userInfo) {
    return (
      <div className="accountView">
        <div className="accountView__header" />
        <div className="accountView__overview container">
          <button
            className="accountView__overview--badge"
            onClick={() => openModal(true)}
          >
            {userInfo.photo ? (
              <img src={userInfo.photo} alt="" />
            ) : (
              <span>{getUserInitials(userInfo.userName)}</span>
            )}
            <div className="badge__edit">
              <FontAwesomeIcon icon={faImage} />
            </div>
          </button>
          <div className="accountView__overview--editAccount">
            <button className="btn" onClick={() => openModal(true)}>
              Account aanpassen <FontAwesomeIcon icon={faPencil} />
            </button>
          </div>
          <div className="accountView__overview--userInfo">
            <p>
              <span>Gebruikersnaam:</span>{" "}
              {userInfo.userName || "Nog niet ingevuld"}
            </p>
          </div>
          <div className="accountView__overview--logout">
            <button className="btn btn-inverse" onClick={() => logoutUser()}>
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                "Uitloggen"
              )}
            </button>
          </div>
        </div>

        {modal && (
          <Modal modalIsOpen={openModal} clickOnBackground={false}>
            <EditAccount
              user={userInfo}
              userId={userId}
              modalIsOpen={openModal}
            />
          </Modal>
        )}
      </div>
    );
  }

  return <div />;
};

export default AccountView;
