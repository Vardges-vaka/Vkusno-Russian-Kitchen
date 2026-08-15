import {
  translateFn,
} from "../../../../../04_hlprs/_hlprs.index.js";
import {
  PublicFooter_contact,
  PublicFooter_socials,
} from "./_publicFooter_comps.index.js";
import "../00_publicFooter_styles/PublicFooter_aside.css";

const PublicFooter_aside = ({ tContact }) => {
  return (
    <div className="PublicFooter_aside">
      <PublicFooter_contact tContact={tContact} />
      <PublicFooter_socials tContact={tContact} />
    </div>
  );
};

PublicFooter_aside.propTypes = {
  tContact: translateFn.isRequired,
};

export default PublicFooter_aside;
