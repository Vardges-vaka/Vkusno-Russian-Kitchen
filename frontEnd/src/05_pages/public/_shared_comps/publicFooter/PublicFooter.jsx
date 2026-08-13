import { usePublicFooter } from "./02_publicFooter_hooks/_publicFooter_hooks.index.js";
import { PublicFooter_navBar } from "./01_publicFooter_comps/_publicFooter_comps.index.js";
import "./00_publicFooter_styles/PublicFooter.css";

const PublicFooter = () => {
  const { t } = usePublicFooter();

  return (
    <div className="PublicFooter_container">
      <div className="PublicFooter_top">
        {/* Brand block is static text, so no need for a sub-component */}
        <div className="PublicFooter_brand">
          <p className="PublicFooter_brand_name">VKUSNO</p>
          <p className="PublicFooter_brand_tagline">Russian Kitchen</p>
        </div>
        <PublicFooter_navBar t={t} />
      </div>

      <div className="PublicFooter_bottom">
        <p className="PublicFooter_copyright">
          {t("footer.nav_links.copyright")}
        </p>
      </div>
    </div>
  );
};

export default PublicFooter;
