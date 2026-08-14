import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useClientContext } from "../../../03_context/_context.index.js";
import { useHome } from "./02_home_hooks/_home_hooks.index.js";
import {
  BookShelfSection,
  Home_hero,
  Home_featuredCarousel,
} from "./01_home_comps/_home.comps.index.js";
import "./00_home_styles/Home.css";

const Home = () => {
  const { t } = useTranslation("Home");
  const navigate = useNavigate();
  const { isDesktop } = useClientContext();

  const {
    lang,
    isLoaded,
    specialtiesRef,
    bookshelfRef,
    isSpecialtiesInView,
    bookshelfItems,
    featuredItems,
  } = useHome();

  return (
    <div className="Home">
      <Home_hero
        isLoaded={isLoaded}
        t={t}
        onMenuClick={() => navigate("/menu")}
      />

      {isDesktop ? (
        <BookShelfSection
          specialtiesRef={specialtiesRef}
          isSpecialtiesInView={isSpecialtiesInView}
          bookshelfRef={bookshelfRef}
          bookshelfItems={bookshelfItems}
          lang={lang}
          t={t}
        />
      ) : (
        <Home_featuredCarousel
          sectionRef={specialtiesRef}
          isInView={isSpecialtiesInView}
          featuredItems={featuredItems}
          lang={lang}
          t={t}
        />
      )}
    </div>
  );
};

export default Home;
