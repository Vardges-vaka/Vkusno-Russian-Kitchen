import {
  ThemeToggler,
  LanguageSelect,
} from "../../../../../02_comps/_comps.index.js";

import "../00_publicHeader_styles/PublicHeader_actions.css";

const PublicHeader_actions = () => {
  return (
    <aside className="PublicHeader_actions">
      <LanguageSelect /> <ThemeToggler />
    </aside>
  );
};

export default PublicHeader_actions;
