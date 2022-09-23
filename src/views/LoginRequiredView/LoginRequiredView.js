import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const LoginRequiredView = () => {
  return (
    <div className="loginRequired">
      <h4>Oeps! Hier is nu niks te zien, want...</h4>
      <h1>Je moet ingelogd zijn om deze pagina te kunnen bekijken.</h1>
      <div className="btn-wrapper">
        <Link to="/" className="btn">
          Inloggen <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
    </div>
  )
}

export default LoginRequiredView;