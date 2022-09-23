import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
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

const DisplayPassword = ({ showPassword, password }) => {
  if (showPassword) {
    return password;
  }
  return [...password].map((char, i) => (
    <React.Fragment key={i}>●</React.Fragment>
  ));
};

const AccountView = () => {
  const [userId] = useState(StorageHandler.get('user'));
  const [userInfo, setUserInfo] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [modal, openModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const logoutUser = async () => {
    setLoading(true);
    await StorageHandler.remove("user");
    window.location.href = "/";
    setLoading(false);
  };

  useEffect(() => {
    if (!userInfo) getUserInfo(userId, setUserInfo);
  }, [userId, userInfo]);

  if (userInfo) {
    return (
      <div className="accountView">
        <div className="accountView__header">
          {userInfo.bannerImage && <img src={userInfo.bannerImage} alt="" />}
          <div className="accountView__header--edit">
            <FontAwesomeIcon icon={faImage} />
            Omslagfoto bewerken
          </div>
        </div>
        <div className="accountView__overview container">
          <div className="accountView__overview--badge">
            {userInfo.photo ? (
              <img src={userInfo.photo} alt="" />
            ) : (
              <span>{getUserInitials(userInfo.name)}</span>
            )}
            <div className="badge__edit">
              <FontAwesomeIcon icon={faImage} />
            </div>
          </div>
          <div className="accountView__overview--editAccount">
            <button className="btn" onClick={() => openModal(true)}>
              Account aanpassen <FontAwesomeIcon icon={faPencil} />
            </button>
          </div>
          <div className="accountView__overview--userInfo">
            <p>
              <span>Naam:</span> {userInfo.name || 'Nog niet ingevuld'}
            </p>
            <p>
              <span>Gebruikersnaam:</span> {userInfo.userName || 'Nog niet ingevuld'}
            </p>
            <p>
              <span>E-mailadres:</span> {userInfo.email}
            </p>
            <p className="password">
              <span>Wachtwoord:</span>{" "}
              {
                <DisplayPassword
                  showPassword={showPassword}
                  password={userInfo.password}
                />
              }
              <button
                className="togglePasswordVisibility"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </button>
            </p>
          </div>
          <div className="accountView__overview--logout">
            <button className="btn btn-inverse" onClick={() => logoutUser()}>
            {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Uitloggen"}
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
