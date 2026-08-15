import { Logo } from "../../../../02_comps/_comps.index.js";
import { localePath } from "../../../../00_config/_config.index.js";
import { usePublicHeader } from "./02_publicHeader_hooks/_publicHeader_hooks.index.js";
import {
  PublicHeader_navBar,
  PublicHeader_actions,
} from "./01_publicHeader_comps/_publicHeader_comps.index.js";
import "./00_publicHeader_styles/PublicHeader.css";

const PublicHeader = () => {
  const { headerRef, lang, t } = usePublicHeader();
  return (
    <div className="PublicHeader_container" ref={headerRef}>
      <div className="PublicHeader_logo">
        <Logo to={localePath(lang)} />
      </div>
      <PublicHeader_navBar t={t} lang={lang} />
      <PublicHeader_actions />
    </div>
  );
};

export default PublicHeader;
