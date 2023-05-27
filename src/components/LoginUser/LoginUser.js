import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { APIHandler, StorageHandler } from "config/C4";

import avatar from "assets/images/avatar.png";

const getAllUsers = async (callback) => {
  const users = await APIHandler.getAllUsers();
  callback(users);
};

const LoginUser = ({ setDisplayRegister }) => {
  const [allUsers, setAllUsers] = useState(null);

  useEffect(() => {
    if (!allUsers) {
      getAllUsers(setAllUsers);
    }
  }, [setAllUsers, allUsers]);

  const loginUser = (userId) => {
    StorageHandler.set("user", userId);
    window.location.reload();
  };

  if (allUsers) {
    return (
      <div className="loginUser">
        <p className="loginUser__intro">
          Log in bij je Flavorology account om verder te gaan met je favoriete
          recepten.
        </p>
        <div className="loginUser__grid">
          {Object.entries(allUsers).map((item, i) => {
            const { info } = item[1];
            return (
              <button
                key={i}
                className="loginUser__grid--userCard"
                onClick={() => loginUser(item[0])}
              >
                {info.photo ? (
                  <img src={info.photo} width="150" height="150" alt="" />
                ) : (
                  <img src={avatar} width="150" height="150" alt="" />
                )}
                <p>{info.userName || info.name || info.email}</p>
              </button>
            );
          })}
          <button
            className="loginUser__grid--addAccount"
            onClick={() => setDisplayRegister(true)}
          >
            <FontAwesomeIcon icon={faPlus} />
            <p>Account toevoegen</p>
          </button>
        </div>
      </div>
    );
  }
  return <div />;
};

export default LoginUser;
