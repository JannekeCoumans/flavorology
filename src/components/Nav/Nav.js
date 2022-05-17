import React, { useCallback, useEffect, useRef, useState } from "react";
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

// const scrollFunction = () => {
//   if (document.getElementById("nav")) {
//     if (
//       document.body.scrollTop > 10 ||
//       document.documentElement.scrollTop > 10
//     ) {
//       document.getElementById("nav").className = "nav scrolled";
//     } else {
//       document.getElementById("nav").className = "nav";
//     }
//   }
// };

const Nav = () => {
  const [y, setY] = useState(document.scrollingElement.scrollHeight);
  const ref = useRef(null);

  const handleNavigation = useCallback(
    (e) => {
      if (window.scrollY <= 0) {
        const nav = ref.current;
        nav.className = "nav";
        return;
      }
      if (y > window.scrollY) {
        const nav = ref.current;
        nav.className = "nav scrolled";
      } else if (y < window.scrollY) {
        const nav = ref.current;
        nav.className = "nav top";
      }
      setY(window.scrollY);
    },
    [y]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleNavigation);
    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, [handleNavigation]);

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
