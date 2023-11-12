// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locals/en/translation.json'; // English translations
import translationAR from './locals/ar/translation.json'; // Arabic translations

const resources = {
  en: { translation: translationEN },
  ar: { translation: translationAR }
};

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: 'ar', // default language
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
