import React from "react";
import "./00_comps_styles/Logo.css";

const Logo = ({ onClick }) => {
  const mainText = "VKUSNO";
  const subtitleText = "Russian Kitchen";

  return (
    <div className="vkusno-logo-container" onClick={onClick}>
      {/* Main Logo */}
      <div className="vkusno-logo main">
        {mainText.split("").map((letter, index) => (
          <span
            key={`main-${index}`}
            className="letter"
            data-letter={letter}
            style={{ "--delay": `${index * 0.5}s` }}>
            {letter}
          </span>
        ))}
      </div>

      {/* Subtitle */}
      <div className="vkusno-logo subtitle">
        {subtitleText.split("").map((letter, index) => (
          <span
            key={`subtitle-${index}`}
            className="letter"
            data-letter={letter}
            style={{ "--delay": `${index * 0.3}s` }}>
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Logo;
