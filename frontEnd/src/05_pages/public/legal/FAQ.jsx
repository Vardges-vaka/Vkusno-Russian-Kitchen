import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CONTACT_INFO } from "../contact/04_contact_const/_contact_const.index.js";
import { PageMeta } from "../../../02_comps/_comps.index.js";
import { faqNode, graph } from "../../../04_hlprs/_hlprs.index.js";
import "./00_legal_styles/FAQ.css";

// Answers reference the phone and email as {{phone}} / {{email}} rather than
// literals, so the numbers live only in CONTACT_INFO.js. i18next applies
// interpolation to nested strings inside a returnObjects result.
const CONTACT_EMAIL = CONTACT_INFO.find((item) => item.name === "email")?.label;
const CONTACT_PHONE = CONTACT_INFO.find((item) => item.name === "phone")?.label;

const FAQ = () => {
  const { t } = useTranslation("FAQ");
  const groups = t("groups", {
    returnObjects: true,
    phone: CONTACT_PHONE,
    email: CONTACT_EMAIL,
  });
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <div className="FAQ_container">
      <PageMeta
        title={t("meta.title")}
        description={t("meta.description")}
        jsonLd={graph(faqNode(groups))}
      />

      <header className="FAQ_hero">
        <h1 className="FAQ_hero_title">{t("title")}</h1>
        <p className="FAQ_hero_intro">{t("intro")}</p>
      </header>

      <div className="FAQ_content">
        {Array.isArray(groups) &&
          groups.map((group, groupIndex) => (
            <section
              key={group.title}
              className="FAQ_group"
              aria-labelledby={`faq-group-${groupIndex}`}>
              <h2
                id={`faq-group-${groupIndex}`}
                className="FAQ_group_title">
                {group.title}
              </h2>

              <dl className="FAQ_list">
                {group.items?.map((item, itemIndex) => {
                  const id = `faq-${groupIndex}-${itemIndex}`;
                  const isOpen = openId === id;

                  return (
                    <div
                      key={id}
                      className={`FAQ_item${isOpen ? " FAQ_item--open" : ""}`}>
                      <dt className="FAQ_item_term">
                        <button
                          type="button"
                          className="FAQ_item_trigger"
                          aria-expanded={isOpen}
                          aria-controls={`${id}-panel`}
                          onClick={() => handleToggle(id)}>
                          <span className="FAQ_item_question">
                            {item.question}
                          </span>
                          <span className="FAQ_item_icon" aria-hidden="true" />
                        </button>
                      </dt>
                      <dd
                        id={`${id}-panel`}
                        className="FAQ_item_panel"
                        hidden={!isOpen}>
                        <p className="FAQ_item_answer">{item.answer}</p>
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </section>
          ))}
      </div>
    </div>
  );
};

export default FAQ;
