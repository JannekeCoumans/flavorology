import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { APIHandler, StorageHandler, UserSettings } from "config/C4";

const RegisterUser = ({ setDisplayRegister, loggedInIsTrue }) => {
  const [input, setInput] = useState({ ...UserSettings });
  const [overallError, setOverallError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setOverallError(false);
    setUserNameError(false);
    const { value, id } = e.target;
    const newUser = input;
    newUser.info[id] = value;
    newUser.accountCreated = new Date();
    setInput(newUser);
  };

  const checkAllInputs = () => {
    return Array.from(document.getElementsByTagName("input")).every(
      (val) => val.checkValidity() === true
    );
  };

  const registerUser = async () => {
    setLoading(true);
    if (!checkAllInputs()) {
      setOverallError(true);
      setLoading(false);
    } else {
      const userNameExists = await APIHandler.checkUserName(
        input.info.userName
      );
      if (userNameExists) {
        setUserNameError(true);
        setLoading(false);
      } else {
        await APIHandler.addUser(input);
        const userId = await APIHandler.getUserId(input.info.userName);
        StorageHandler.set("user", userId);
        alert(
          "Je account is succesvol aangemaakt. Je wordt nu ingelogd met je nieuwe account."
        );
        setLoading(false);
        loggedInIsTrue(true);
      }
    }
  };

  return (
    <div className="registerUser">
      <p>Vul een gebruikersnaam in om aan de slag te gaan!</p>
      <div className="row">
        <input
          type="text"
          id="userName"
          placeholder="Gebruikersnaam"
          onChange={changeHandler}
          required
        />
        {userNameError && (
          <p className="inputError">
            Er is al een account gecreeërd met deze gebruikersnaam. Log in met
            dit account of kies een andere gebruikersnaam.
          </p>
        )}
      </div>

      {overallError && <p>Vul het veld in om verder te gaan.</p>}

      <div className="btn-wrapper">
        <button type="submit" className="btn" onClick={() => registerUser()}>
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            "Account aanmaken"
          )}
        </button>
        <button className="btn-flat" onClick={() => setDisplayRegister(false)}>
          Ik heb al een account
        </button>
      </div>
    </div>
  );
};

export default RegisterUser;
