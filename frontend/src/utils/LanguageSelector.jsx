import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const Languages = [
    { code: "en", lang: "English" },
    { code: "fr", lang: "French" },
    { code: "hi", lang: "Hindi" },
  ];

  const changeLanguage = (lang) => {
    console.log(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="border border-gray-400 rounded-lg">
      <h4 className="text-center align-middle h-full text-4xl my-4 mx-4">
        Select your language
      </h4>
      <div className="flex m-5 p-4">
        <ul className="grid md:flex w-full text-center justify-center gap-4">
          {Languages.map((language) => (
            <button
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className={i18n.language === language.code ? "selected" : ""}
            >
              <div className="px-4 mx-2 text-lg border border-gray-600 rounded-sm">
                {language.lang}
              </div>
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LanguageSelector;
