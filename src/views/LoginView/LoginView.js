import React, { useState } from "react";
import { AlertPopup, LoginUser, RegisterUser, StorageHandler } from "config/C4";

import logo from "assets/images/logo_white.svg";

const LoginView = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [displayRegister, setDisplayRegister] = useState(false);

  const loginAsGuest = () => {
    StorageHandler.set('user', '-NCeEygPhOKrvTPFY4BU');
    window.location.reload();
  };

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
      {showPopup && (
        <AlertPopup
          title="Ben je nieuw hier en heb je geen zin om een account aan te maken?"
          text="Ben je alleen maar hier naartoe gekomen om te kijken hoe het project werkt en heb je geen zin om eerst recepten aan te maken om alles te kunnen zien? Dat kan! Klik hieronder op de knop: 'Inloggen met gastaccount' om het project te bekijken in al zijn glorie."
          cancelFunction={() => loginAsGuest()}
          cancelText="Inloggen met gastaccount"
          continueFunction={() => setShowPopup(false)}
          continueText="Inloggen of account aanmaken"
        />
      )}
    </div>
  );
};

export default LoginView;
