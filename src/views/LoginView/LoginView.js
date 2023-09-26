import React, { useState } from "react";
import { LoginUser, RegisterUser } from "config/C4";

const LoginView = ({ loggedInIsTrue }) => {
  const [displayRegister, setDisplayRegister] = useState(false);

  return (
    <div className="loginView">
      <h1>Welkom bij Flavorology</h1>
      <h4>Altijd je éigen favoriete recepten bij de hand.</h4>
      {displayRegister ? (
        <RegisterUser
          setDisplayRegister={setDisplayRegister}
          loggedInIsTrue={loggedInIsTrue}
        />
      ) : (
        <LoginUser
          setDisplayRegister={setDisplayRegister}
          loggedInIsTrue={loggedInIsTrue}
        />
      )}
    </div>
  );
};

export default LoginView;
