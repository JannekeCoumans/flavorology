import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faSpinner } from "@fortawesome/free-solid-svg-icons";

import { APIHandler, StorageHandler, UserSettings } from 'config/C4';

const RegisterUser = ({ setDisplayRegister }) => {
  const [input, setInput] = useState({...UserSettings});
  const [showPassword, setShowPassword] = useState(false);
  const [overallError, setOverallError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setOverallError(false);
    setEmailError(false);
    const { value, id } = e.target;
    const newUser = input;
    newUser.info[id] = value;
    newUser.accountCreated = new Date();
    setInput(newUser);
  };

  const checkAllInputs = () => {
    return Array.from(document.getElementsByTagName('input')).every(val => val.checkValidity() === true);
  }

  const registerUser = async () => {
    setLoading(true);
    if (!checkAllInputs()) {
      setOverallError(true);
      setLoading(false);
    } else {
      const emailExists = await APIHandler.checkEmail(input.info.email);
      if (emailExists) {
        setEmailError(true);
        setLoading(false);
      } else {
        await APIHandler.addUser(input);
        const userId = await APIHandler.getUserId(input.info.email);
        StorageHandler.set('user', userId);
        alert('Je account is succesvol aangemaakt. Je wordt nu ingelogd met je nieuwe account.');
        setLoading(false);
        window.location.reload();
      }
    }
  }


  return (
    <div className="registerUser">
      <p>Creeër een account om aan de slag te gaan!</p>
      <hr />
      <div className="row">
        <input
          type="text"
          id="email"
          placeholder="E-mailadres"
          onChange={changeHandler}
          required
        />
        {emailError && <p className="inputError">Er is al een account gecreeërd met dit e-mailadres. Log in met dit adres of kies een ander e-mailadres.</p>}
      </div>
      <div className="row">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          placeholder="Wachtwoord"
          onChange={changeHandler}
          required
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

      {overallError && <p className="inputError">Oeps, niet alle velden zijn ingevuld.</p>}

      <div className="btn-wrapper">
        <button type="submit" className="btn" onClick={() => registerUser()}>{loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Account aanmaken"}</button>
        <button
          className="btn-flat"
          onClick={() => setDisplayRegister(false)}
        >
          Ik heb al een account
        </button>
      </div>
    </div>
  );
};

export default RegisterUser;
