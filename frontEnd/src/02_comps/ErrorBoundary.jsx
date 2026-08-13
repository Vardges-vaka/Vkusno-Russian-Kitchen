import React from "react";
import PropTypes from "prop-types";
// Classes can't use the useTranslation hook, so we call the i18n
// instance directly — fine here, an error screen doesn't need to
// react to live language switches.
import i18n from "../i18n/i18n.index.js";
import "./00_comps_styles/errorBoundary.css";

// Error boundaries are the one case React still requires a class:
// componentDidCatch / getDerivedStateFromError have no hook equivalent.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Kept as console output until a real error-reporting service exists
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="errorBoundary" role="alert">
        <p className="errorBoundary__brand">VKUSNO</p>
        <h1 className="errorBoundary__title">
          {i18n.t("error.title", { ns: "common" })}
        </h1>
        <p className="errorBoundary__message">
          {i18n.t("error.message", { ns: "common" })}
        </p>
        <button
          type="button"
          className="errorBoundary__reload"
          onClick={this.handleReload}>
          {i18n.t("error.reload", { ns: "common" })}
        </button>
      </div>
    );
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

ErrorBoundary.displayName = "ErrorBoundary";

export default ErrorBoundary;
