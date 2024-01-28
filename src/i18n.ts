import i18next from "i18next";
// import HttpBackend from "i18next-http-backend";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
// import { reactI18nextModule } from "react-i18next";

import translationUA from "./locales/ua/translation.json";
import translationRU from "./locales/ru/translation.json";
import translationEN from "./locales/en/translation.json";

const resources = {
  ua: {
    translation: translationUA,
  },
  ru: {
    translation: translationRU,
  },
  en: {
    translation: translationEN,
  },
};

i18next
  // .use(HttpBackend)
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "ua",
  });
