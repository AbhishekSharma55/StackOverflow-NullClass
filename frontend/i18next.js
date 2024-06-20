import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18next.use(LanguageDetector).use(initReactI18next).init({
    debugger: true,
    lng : 'en',
    resources : {
        en : {
            translation : {
                title : "Hello World!",
                AllQuestions: "All Questions",
            }
        },
        fr : {
            translation : {
                title : "Bonjour le monde!",
                AllQuestions: "toutes les questions",
            }
        },
        hi : {
            translation : {
                title : "नमस्ते दुनिया!",
                AllQuestions: "सभी प्रश्न",

            }
        }
    }
});
