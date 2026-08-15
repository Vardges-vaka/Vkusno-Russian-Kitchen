import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./00_comps_styles/Logo.css";

const MAIN_TEXT = "VKUSNO";
const SUBTITLE_TEXT = "Russian Kitchen";
const LABEL = `${MAIN_TEXT} - ${SUBTITLE_TEXT}`;

// The wordmark is split into one <span> per letter so each can animate its
// fill independently. Two consequences to handle:
//
//   - a screen reader would otherwise read "V, K, U, S, N, O" letter by
//     letter, so the letters are aria-hidden and the container carries a
//     single readable label
//   - the spans are inline-blocks, which reorder under dir="rtl" - the
//     wordmark is always Latin, so it is pinned to dir="ltr"
const Letters = ({ text, step }) => (
  <>
    {text.split("").map((letter, index) => (
      <span
        key={`${text}-${index}`}
        className="letter"
        data-letter={letter}
        style={{ "--delay": `${index * step}s` }}>
        {letter}
      </span>
    ))}
  </>
);

Letters.propTypes = {
  text: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
};

const Logo = ({ to }) => {
  // aria-hidden sits on each line rather than on a shared wrapper: the
  // container is a flex column, so an extra element would collapse both
  // lines into one flex item.
  const content = (
    <>
      <span className="vkusno-logo main" aria-hidden="true">
        <Letters text={MAIN_TEXT} step={0.5} />
      </span>
      <span className="vkusno-logo subtitle" aria-hidden="true">
        <Letters text={SUBTITLE_TEXT} step={0.3} />
      </span>
    </>
  );

  // In the header the logo is the "go home" link; in the footer it is purely
  // decorative. A real <Link> rather than a div with onClick, so it is
  // keyboard reachable and supports middle-click / open-in-new-tab.
  if (to) {
    return (
      <Link className="vkusno-logo-container" to={to} dir="ltr" aria-label={LABEL}>
        {content}
      </Link>
    );
  }

  return (
    <div className="vkusno-logo-container" dir="ltr" role="img" aria-label={LABEL}>
      {content}
    </div>
  );
};

Logo.propTypes = {
  to: PropTypes.string,
};

export default Logo;
