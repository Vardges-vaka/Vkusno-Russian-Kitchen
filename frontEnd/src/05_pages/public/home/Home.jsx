import { useNavigate, useParams } from "react-router-dom";
import { localePath, resolveLanguage } from "../../../00_config/_config.index.js";
import { useTranslation } from "react-i18next";
import { useClientContext } from "../../../03_context/_context.index.js";
import { PageMeta } from "../../../02_comps/_comps.index.js";
import { graph, organisationNode, restaurantNode } from "../../../04_hlprs/_hlprs.index.js";
import { BRANCHES, CONTACT_INFO } from "../contact/04_contact_const/_contact_const.index.js";
import { useHome } from "./02_home_hooks/_home_hooks.index.js";
import {
  BookShelfSection,
  Home_hero,
  Home_featuredCarousel,
} from "./01_home_comps/_home.comps.index.js";
import "./00_home_styles/Home.css";

const Home = () => {
  const { t, i18n } = useTranslation("Home");
  const { lang: langParam } = useParams();
  const routeLang = resolveLanguage(langParam, i18n.language);
  const navigate = useNavigate();
  const { isDesktop } = useClientContext();

  const {
    lang,
    specialtiesRef,
    bookshelfRef,
    isSpecialtiesInView,
    shouldReduceMotion,
    bookshelfItems,
    featuredItems,
  } = useHome();

  return (
    <div className="Home">
      <PageMeta
        title={t("meta.title")}
        description={t("meta.description")}
        jsonLd={graph(
          organisationNode(routeLang),
          BRANCHES.map((branch) =>
            restaurantNode(branch, routeLang, CONTACT_INFO),
          ),
        )}
      />

      <Home_hero t={t} shouldReduceMotion={shouldReduceMotion} onMenuClick={() => navigate(localePath(routeLang, "menu"))} />

      {isDesktop ? (
        <BookShelfSection
          specialtiesRef={specialtiesRef}
          isSpecialtiesInView={isSpecialtiesInView}
          bookshelfRef={bookshelfRef}
          bookshelfItems={bookshelfItems}
          shouldReduceMotion={shouldReduceMotion}
          lang={lang}
          t={t}
        />
      ) : (
        <Home_featuredCarousel
          sectionRef={specialtiesRef}
          isInView={isSpecialtiesInView}
          featuredItems={featuredItems}
          shouldReduceMotion={shouldReduceMotion}
          lang={lang}
          t={t}
        />
      )}
    </div>
  );
};

export default Home;
