import menuEnUrl from "./menu_en.pdf?url";
import menuRuUrl from "./menu_ru.pdf?url";
import menuArUrl from "./menu_ar.pdf?url";

// Endonyms help visitors choose a PDF even if they cannot read the current UI.
// Imported URLs follow Vite's asset hashes; saved filenames stay readable.
export const MENU_PDFS = {
  en: {
    label: "English",
    dir: "ltr",
    url: menuEnUrl,
    fileName: "Vkusno-Menu-EN.pdf",
  },
  ru: {
    label: "Русский",
    dir: "ltr",
    url: menuRuUrl,
    fileName: "Vkusno-Menu-RU.pdf",
  },
  ar: {
    label: "العربية",
    dir: "rtl",
    url: menuArUrl,
    fileName: "Vkusno-Menu-AR.pdf",
  },
};
