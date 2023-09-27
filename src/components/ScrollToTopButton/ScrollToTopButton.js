import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ScrollToTopButton = ({ scrollToElement }) => {
  const scrollToTop = () => {
    const top = document.getElementById(scrollToElement);
    top.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  return (
    <div
      id="scroll-to-top"
      className="scroll-to-top"
      onClick={() => scrollToTop()}
    >
      <FontAwesomeIcon icon={faChevronUp} />
    </div>
  );
};

export default ScrollToTopButton;
