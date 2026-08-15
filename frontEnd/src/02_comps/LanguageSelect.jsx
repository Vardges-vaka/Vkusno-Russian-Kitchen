import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { isSupportedLanguage, localePath } from "../00_config/_config.index.js";
import {
  RussianFlag,
  BritishFlag,
  ArabicFlag,
} from "../01_assets/_assets.index.js";
import "./00_comps_styles/languageSelect.css";

// Language names are deliberately NOT translated: this control exists for
// someone who cannot read the current UI language, so each option is written
// in its own language (endonym) and reads the same in all three locales.
const LANGUAGE_ENDONYMS = {
  en: "English",
  ar: "العربية",
  ru: "Русский",
};

const LanguageSelect = () => {
  const { i18n, t } = useTranslation("common");
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  // Which option the keyboard is on. Mirrored to aria-activedescendant so
  // screen readers follow arrow keys without moving real DOM focus.
  const [activeIndex, setActiveIndex] = useState(0);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const listRef = useRef(null);

  const currentLanguage = i18n.language;

  const languages = useMemo(
    () => [
      { code: "en", name: LANGUAGE_ENDONYMS.en, dir: "ltr", flag: BritishFlag },
      { code: "ar", name: LANGUAGE_ENDONYMS.ar, dir: "rtl", flag: ArabicFlag },
      { code: "ru", name: LANGUAGE_ENDONYMS.ru, dir: "ltr", flag: RussianFlag },
    ],
    [],
  );

  const currentIndex = Math.max(
    0,
    languages.findIndex((lang) => lang.code === currentLanguage),
  );
  const currentLang = languages[currentIndex];

  const closeMenu = useCallback((returnFocus = true) => {
    setIsOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  const openMenu = useCallback(() => {
    setActiveIndex(currentIndex);
    setIsOpen(true);
  }, [currentIndex]);

  // Switching language is a navigation, not a state change: the URL owns the
  // language now. Swap the /:lang segment and keep the rest of the path, so
  // /ru/menu becomes /ar/menu rather than dumping the reader on the home page.
  //
  // Dish pages keep their slug here; MenuItem then redirects to that dish's
  // slug in the new language, which keeps one canonical URL per dish.
  const changeLanguage = useCallback(
    (langCode) => {
      const segments = location.pathname.split("/").filter(Boolean);
      const rest = isSupportedLanguage(segments[0])
        ? segments.slice(1)
        : segments;

      navigate(localePath(langCode, rest.join("/")) + location.search, {
        replace: true,
      });
      closeMenu();
    },
    [navigate, location.pathname, location.search, closeMenu],
  );

  // Move real focus onto the listbox when it opens, so arrow keys reach it.
  useEffect(() => {
    if (isOpen) listRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Pointer dismissal - don't yank focus back to the button.
        closeMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeMenu]);

  // NB: document dir/lang are NOT set here. They are stamped before first
  // paint by the inline script in index.html and kept in sync by
  // LanguageContext - doing it from this component meant an Arabic reload
  // rendered LTR first and then jumped.

  const handleTriggerKeyDown = (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      openMenu();
    }
  };

  const handleListKeyDown = (event) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((index) => (index + 1) % languages.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex(
          (index) => (index - 1 + languages.length) % languages.length,
        );
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(languages.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        changeLanguage(languages[activeIndex].code);
        break;
      case "Escape":
        event.preventDefault();
        closeMenu();
        break;
      case "Tab":
        // Let focus leave naturally, but don't leave an orphaned popup behind.
        closeMenu(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="languageSwitcher" ref={dropdownRef}>
      <button
        ref={buttonRef}
        type="button"
        className="languageSwitcher__button"
        onClick={() => (isOpen ? closeMenu() : openMenu())}
        onKeyDown={handleTriggerKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`${t("language.selector.aria")} (${currentLang.name})`}
        title={t("language.click")}>
        <img
          src={currentLang.flag}
          alt=""
          aria-hidden="true"
          className="languageSwitcher__flag-img"
        />
      </button>

      {isOpen && (
        <ul
          ref={listRef}
          className="languageSwitcher__dropdown"
          role="listbox"
          tabIndex={-1}
          aria-label={t("language.selector.aria")}
          aria-activedescendant={`languageSwitcher__option--${languages[activeIndex].code}`}
          onKeyDown={handleListKeyDown}>
          {languages.map((lang, index) => (
            <li
              key={lang.code}
              id={`languageSwitcher__option--${lang.code}`}
              role="option"
              aria-selected={lang.code === currentLanguage}
              lang={lang.code}
              className={[
                "languageSwitcher__option",
                lang.code === currentLanguage ? "active" : "",
                index === activeIndex ? "focused" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => changeLanguage(lang.code)}
              onMouseEnter={() => setActiveIndex(index)}>
              <img
                src={lang.flag}
                alt=""
                aria-hidden="true"
                className="languageSwitcher__flag-img"
              />
              <span className="languageSwitcher__name">{lang.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelect;
