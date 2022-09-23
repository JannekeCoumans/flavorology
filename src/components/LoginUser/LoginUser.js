import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

import { APIHandler, StorageHandler } from "config/C4";

const LoginUser = ({ setDisplayRegister }) => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [overallError, setOverallError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setOverallError(false);
    setEmailError(false);
    setPasswordError(false);
    const { value, id } = e.target;
    const loginUser = input;
    loginUser[id] = value;
    setInput(loginUser);
  };

  const checkAllInputs = () => {
    return Array.from(document.getElementsByTagName("input")).every(
      (val) => val.checkValidity() === true
    );
  };

  const loginUser = async () => {
    setLoading(true);
    if (!checkAllInputs()) {
      setOverallError(true);
      setLoading(false);
    } else {
      const userId = await APIHandler.getUserId(input.email);
      if (!userId) {
        setEmailError(true);
        setLoading(false);
      } else {
        const checkPassword = await APIHandler.checkPassword(
          userId,
          input.password
        );
        if (!checkPassword) {
          setPasswordError(true);
          setLoading(false);
        } else {
          StorageHandler.set("user", userId);
          window.location.reload();
        }
      }
    }
  };

  return (
    <div className="loginUser">
      <p>
        Log in bij je Flavorology account om verder te gaan met je favoriete
        recepten.
      </p>
      <hr />
      <div className="row">
        <input
          type="text"
          id="email"
          placeholder="E-mailadres"
          onChange={changeHandler}
          required
        />
      </div>
      {emailError && (
        <p className="inputError">
          Er is geen account met dit e-mailadres. Log in met een ander adres of
          creeër een nieuw account.
        </p>
      )}
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

      {passwordError && (
        <p className="inputError">
          Het wachtwoord is onjuist. Probeer het opnieuw.
        </p>
      )}

      {overallError && (
        <p className="inputError">Oeps, niet alle velden zijn ingevuld.</p>
      )}

      <div className="btn-wrapper">
        <button className="btn" onClick={() => loginUser()}>
          {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Inloggen"}
        </button>
        <button className="btn-flat" onClick={() => setDisplayRegister(true)}>
          Ik heb geen account
        </button>
      </div>
    </div>
  );
};

export default LoginUser;
