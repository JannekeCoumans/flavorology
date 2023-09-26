import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faList,
  faUser,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

import logo from "assets/images/logo.svg";
import ShoppinglistIsFilled from "config/ShoppinglistIsFilled";
import ShoppingListIcon from "./ShoppingListIcon";

const SearchInput = () => {
  return (
    <div className="search-input">
      <FontAwesomeIcon icon={faSearch} />
      <input type="text" placeholder="Search" />
    </div>
  );
};

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef(null);

  const handleNavigation = useCallback((e) => {
    if (window.scrollY <= 0) {
      const nav = ref.current;
      nav.className = "nav";
      return;
    }

    const nav = ref.current;
    nav.className = "nav nav-scrolled";
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleNavigation);
    ShoppinglistIsFilled();
    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, [handleNavigation]);

  const openMenu = () => {
    document.body.style = "overflow: hidden";
    setMenuOpen(true);
  };

  const closeMenu = () => {
    document.body.style = "overflow: auto";
    setMenuOpen(false);
  };

  return (
    <nav id="nav" className="nav" ref={ref}>
      <div className="nav__wrapper container">
        <div className="nav__logo">
          <Link to="/">
            <img src={logo} alt="Flavorology" />
          </Link>
        </div>
        <div className="nav__menu">
          <Link to="/recepten">Recepten</Link>
          <Link to="/onlangs-toegevoegd">Onlangs toegevoegd</Link>
          <Link to="/uitproberen">Uitproberen</Link>
          <SearchInput />
        </div>
        <button onClick={() => openMenu()} className="nav__burgermenu">
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className={`nav__sidemenu ${menuOpen ? "active" : "closed"}`}>
          <div className="nav__sidemenu--wrapper">
            <button className="close-menu" onClick={() => closeMenu()}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <Link onClick={() => closeMenu()} className="logo" to="/">
              <img src={logo} alt="Flavorology" />
            </Link>
            <div className="sidemenu__items">
              <Link onClick={() => closeMenu()} to="/">
                Home
              </Link>
              <Link onClick={() => closeMenu()} to="/recepten">
                Recepten
              </Link>
              <Link onClick={() => closeMenu()} to="/onlangs-toegevoegd">
                Onlangs toegevoegd
              </Link>
              <Link onClick={() => closeMenu()} to="/uitproberen">
                Uitproberen
              </Link>

              <hr />

              <Link onClick={() => closeMenu()} to="/recept-toevoegen">
                <FontAwesomeIcon icon={faPlus} /> Recept toevoegen
              </Link>
              <Link onClick={() => closeMenu()} to="/boodschappenlijstje">
                <FontAwesomeIcon icon={faList} /> Boodschappenlijstje
              </Link>
              <Link onClick={() => closeMenu()} to="/favorieten">
                <FontAwesomeIcon icon={faHeart} /> Favorieten
              </Link>
              <Link onClick={() => closeMenu()} to="/account">
                <FontAwesomeIcon icon={faUser} /> Account
              </Link>
            </div>
          </div>
        </div>
        <div className="nav__icons">
          <Link to="/recept-toevoegen" className="icon add">
            <FontAwesomeIcon icon={faPlus} />
          </Link>
          <ShoppingListIcon />
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
