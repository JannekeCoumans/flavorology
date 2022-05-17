import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faList,
  faUser,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

import logo from "assets/images/logo.svg";

const SearchInput = () => {
  return (
    <div className="search-input">
      <FontAwesomeIcon icon={faSearch} />
      <input type="text" placeholder="Search" />
    </div>
  );
};

const scrollFunction = () => {
if (document.getElementById("nav")) {
  if (
    document.body.scrollTop > 50 ||
    document.documentElement.scrollTop > 50
  ) {
    document.getElementById("nav").className = "nav scrolled";
  } else {
    document.getElementById("nav").className = "nav";
  }
}
}

const Nav = () => {
  
  window.onscroll = () => {
    scrollFunction();
  };

  return (
    <nav id="nav" className="nav">
      <div className="nav__wrapper container">
        <div className="nav__logo">
          <Link to="/"><img src={logo} alt="Flavorology" /></Link>
        </div>
        <div className="nav__menu">
          <Link to="/recepten">Recepten</Link>
          <Link to="/onlangs-toegevoegd">Onlangs toegevoegd</Link>
          <Link to="/uitproberen">Uitproberen</Link>
          <SearchInput />
        </div>
        <div className="nav__burgermenu">
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className="nav__icons">
          <Link to="/recept-toevoegen" className="icon add">
            <FontAwesomeIcon icon={faPlus} />
          </Link>
          <Link to="/boodschappenlijstjes" className="icon list">
            <FontAwesomeIcon icon={faList} />
          </Link>
          <Link to="/favorieten" className="icon favorites">
            <FontAwesomeIcon icon={faHeart} />
          </Link>
          <Link to="/account" className="icon user">
            <FontAwesomeIcon icon={faUser} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
