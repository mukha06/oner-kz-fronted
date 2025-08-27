import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import kk from './locales/KAZtranslation.json'
import ru from './locales/RUStranslation.json';
import en from './locales/ENGtranslation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      kk: { translation: kk },
      ru: { translation: ru },
      en: { translation: en }
    },
    lng: 'kk', 
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;