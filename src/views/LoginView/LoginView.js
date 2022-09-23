import React, { useState } from "react";
import { LoginUser, RegisterUser } from 'config/C4';

import logo from "assets/images/logo_white.svg";

const LoginView = () => {
  const [displayRegister, setDisplayRegister] = useState(false);

  return (
    <div className="loginView">
      <div className="loginView__image">
        <img className="loginView__image--logo" src={logo} alt="Flavorology" />
      </div>
      <div className="loginView__content">
        <h1>Welkom bij Flavorology</h1>
        <h4>Altijd je éigen favoriete recepten bij de hand.</h4>
        {displayRegister ? (
          <RegisterUser setDisplayRegister={setDisplayRegister} />
        ) : (
          <LoginUser setDisplayRegister={setDisplayRegister} />
        )}
      </div>
    </div>
  );
};

export default LoginView;
