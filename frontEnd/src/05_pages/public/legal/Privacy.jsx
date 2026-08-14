import { useTranslation } from "react-i18next";
import "./00_legal_styles/Privacy.css";

const CONTACT_EMAIL = "info@vkusno.ae";
const CONTACT_PHONE = "+971 52 102 5674";

const Privacy = () => {
  const { t } = useTranslation("Privacy");
  const sections = t("sections", { returnObjects: true });

  return (
    <div className="Privacy_container">
      <header className="Privacy_hero">
        <h1 className="Privacy_hero_title">{t("title")}</h1>
        <p className="Privacy_hero_meta">{t("lastUpdated")}</p>
        <p className="Privacy_hero_intro">{t("intro")}</p>
      </header>

      <article className="Privacy_content">
        {Array.isArray(sections) &&
          sections.map((section, sectionIndex) => (
            <section
              key={section.title}
              className="Privacy_section"
              aria-labelledby={`privacy-section-${sectionIndex}`}>
              <h2
                id={`privacy-section-${sectionIndex}`}
                className="Privacy_section_title">
                {section.title}
              </h2>

              {section.paragraphs?.map((paragraph, paragraphIndex) => (
                <p
                  key={`${sectionIndex}-p-${paragraphIndex}`}
                  className="Privacy_section_text">
                  {paragraph}
                </p>
              ))}

              {Array.isArray(section.bullets) && section.bullets.length > 0 && (
                <ul className="Privacy_section_list">
                  {section.bullets.map((item, bulletIndex) => (
                    <li key={`${sectionIndex}-b-${bulletIndex}`}>{item}</li>
                  ))}
                </ul>
              )}

              {section.paragraphsAfter?.map((paragraph, paragraphIndex) => (
                <p
                  key={`${sectionIndex}-pa-${paragraphIndex}`}
                  className="Privacy_section_text">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

        <section className="Privacy_section Privacy_section--contact">
          <h2 className="Privacy_section_title">{t("contact.title")}</h2>
          <p className="Privacy_section_text">
            {t("contact.body", {
              email: CONTACT_EMAIL,
              phone: CONTACT_PHONE,
            })}
          </p>
        </section>
      </article>
    </div>
  );
};

export default Privacy;
