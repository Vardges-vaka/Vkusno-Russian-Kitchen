import { usePublicFooter } from "./02_publicFooter_hooks/_publicFooter_hooks.index.js";
import {
  PublicFooter_about,
  PublicFooter_branches,
  PublicFooter_aside,
  PublicFooter_navBar,
} from "./01_publicFooter_comps/_publicFooter_comps.index.js";
import "./00_publicFooter_styles/PublicFooter.css";
import "./00_publicFooter_styles/PublicFooter_navBar.css";

const PublicFooter = () => {
  const { t, tContact, lang, branches } = usePublicFooter();

  return (
    <div className="PublicFooter_container">
      <div className="PublicFooter_inner">
        <div className="PublicFooter_grid">
          <PublicFooter_about t={t} />

          <PublicFooter_branches
            branches={branches}
            lang={lang}
            tContact={tContact}
            t={t}
          />

          <PublicFooter_aside tContact={tContact} />
        </div>
      </div>

      <div className="PublicFooter_bottom">
        <p className="PublicFooter_copyright">
          {t("footer.nav_links.copyright")}
        </p>
        <PublicFooter_navBar t={t} />
      </div>
    </div>
  );
};

export default PublicFooter;
