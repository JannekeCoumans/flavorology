import React, { useEffect, useState } from "react";
import { AlertPopup, APIHandler } from "config/C4";
import {
  faEye,
  faEyeSlash,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditAccount = ({ user, userId, modalIsOpen }) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alteredAccount, setAlteredAccount] = useState(null);
  const [startedEditing, setStartedEditing] = useState(false);
  const [alertPopup, setAlertPopup] = useState(false);

  useEffect(() => {
    if (!alteredAccount) setAlteredAccount({ ...user });
  }, [alteredAccount, user]);

  const changeHandler = (e) => {
    if (!startedEditing) setStartedEditing(true);
    const { id, value } = e.target;
    const input = alteredAccount;
    input[id] = value;
    setAlteredAccount(input);
  };

  const saveAccount = async () => {
    setLoading(true);
    await APIHandler.editUserInfo(userId, alteredAccount);
    setLoading(false);
    alert("Je account is succesvol aangepast");
    modalIsOpen(false);
    window.location.reload();
  };

  return (
    <div className="editAccount">
      <h1>Account aanpassen</h1>
      <div className="editAccount__userInfo">
        <div className="row image">
          <img src={user.photo} alt="" width="150" height="150" />
          <input
            type="text"
            id="photo"
            placeholder="Foto toevoegen"
            defaultValue={user.photo}
            onChange={changeHandler}
          />
        </div>
        <div className="row">
          <label htmlFor="name">Naam:</label>
          <input
            type="text"
            id="name"
            placeholder="Naam"
            defaultValue={user.name}
            onChange={changeHandler}
          />
        </div>
        <div className="row">
          <label htmlFor="userName">Gebruikersnaam:</label>
          <input
            type="text"
            id="userName"
            placeholder="Gebruikersnaam"
            defaultValue={user.userName}
            onChange={changeHandler}
          />
        </div>
        <div className="row">
          <label htmlFor="email">E-mailadres:</label>
          <input
            type="email"
            id="email"
            placeholder="E-mailadres"
            defaultValue={user.email}
            onChange={changeHandler}
          />
        </div>
        <div className="row password">
          <label htmlFor="password">Wachtwoord:</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Wachtwoord"
            defaultValue={user.password}
            onChange={changeHandler}
          />
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
        </div>
      </div>
      <div className="btn-wrapper">
        <button className="btn" onClick={() => saveAccount()}>
          {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Opslaan"}
        </button>
        <button
          className="btn btn-inverse"
          onClick={() => {
            startedEditing ? setAlertPopup(true) : modalIsOpen(false);
          }}
        >
          Annuleren
        </button>
      </div>
      {alertPopup && (
        <AlertPopup
          cancelFunction={() => setAlertPopup(false)}
          cancelText="Verder met wijzigen van je account"
          continueFunction={() => modalIsOpen(false)}
          continueText="Stoppen met wijzigen van je account"
          title="Er zijn onopgeslagen wijzigingen"
          text="Weet je zeker dat je wilt annuleren? Je wijzigingen worden niet opgeslagen"
        />
      )}
    </div>
  );
};

export default EditAccount;
