import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ComingSoon = () => {
  return (
    <div className="comingSoon">
      <h4>Oeps! Hier is nog niks te zien, want...</h4>
      <h1>Aan deze pagina wordt nog gebouwd!</h1>
      <div className="btn-wrapper">
        <Link to="/" className="btn">
          Terug naar home <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
    </div>
  );
};

export default ComingSoon;
