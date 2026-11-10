import { PageMeta } from "../../../02_comps/_comps.index.js";
import { graph, organisationNode, restaurantNode } from "../../../04_hlprs/_hlprs.index.js";
import { Kitchen_card } from "./01_kitchens_comps/_kitchens_comps.index.js";
import { useKitchens } from "./02_kitchens_hooks/_kitchens_hooks.index.js";
import "./00_kitchens_styles/Kitchens.css";

const Kitchens = () => {
  const { t, lang, branches, contactInfo } = useKitchens();

  return (
    <div className="Kitchens_container">
      <PageMeta
        title={t("meta.title")}
        description={t("meta.description")}
        jsonLd={graph(
          organisationNode(lang),
          branches.map((branch) => restaurantNode(branch, lang, contactInfo)),
        )}
      />

      <header className="Kitchens_hero">
        <h1 className="Kitchens_title">{t("hero.title")}</h1>
        <p className="Kitchens_intro">{t("hero.intro")}</p>
      </header>

      <section className="Kitchens_list" aria-label={t("list.title")}>
        <h2 className="Kitchens_list_title">{t("list.title")}</h2>
        <div className="Kitchens_grid">
          {branches.map((branch) => (
            <Kitchen_card key={branch.id} branch={branch} lang={lang} t={t} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Kitchens;
