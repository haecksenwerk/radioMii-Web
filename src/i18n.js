import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { isDevelop } from './utils/system';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)

  .init({
    fallbackLng: 'en',
    load: 'languageOnly',
    debug: isDevelop(),

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: true,
    },

    backend: {
      loadPath: './locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
