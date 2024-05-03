import tw from "@/locales/tw.json";
import us from "@/locales/us.json";
import type { I18n, I18nOptions } from "vue-i18n";
import { createI18n } from "vue-i18n";

type LocaleSchema = {
  name: string;
  locale: typeof tw;
};

const supportLocales: LocaleSchema[] = [
  {
    name: "正體中文",
    locale: tw
  },
  {
    name: "English",
    locale: us
  }
];

function setupI18n(): I18n {
  const options: I18nOptions = {
    globalInjection: true,
    legacy: false,
    locale: supportLocales[0].name,
    fallbackLocale: supportLocales[0].name,
    messages: {}
  };

  supportLocales.forEach((locale) => {
    options.messages![locale.name] = locale.locale;
  });

  const locale = localStorage.getItem("locale");
  if (locale) {
    options.locale = locale;
  }
  const i18n = createI18n(options);
  return i18n;
}

export const i18n = setupI18n();
