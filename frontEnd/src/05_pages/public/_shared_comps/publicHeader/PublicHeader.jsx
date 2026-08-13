import { Logo } from "../../../../02_comps/_comps.index.js";
import { usePublicHeader } from "./02_publicHeader_hooks/_publicHeader_hooks.index.js";
import {
  PublicHeader_navBar,
  PublicHeader_actions,
} from "./01_publicHeader_comps/_publicHeader_comps.index.js";
import "./00_publicHeader_styles/PublicHeader.css";

const PublicHeader = () => {
  const { handlers, t } = usePublicHeader();
  return (
    <div className="PublicHeader_container">
      <Logo onClick={handlers.handleLogoClick} />
      <PublicHeader_navBar t={t} />
      <PublicHeader_actions t={t} />
    </div>
  );
};

export default PublicHeader;
