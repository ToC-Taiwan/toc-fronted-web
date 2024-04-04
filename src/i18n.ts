import { isRef } from "vue";
import { createI18n } from "vue-i18n";

import tw from "@/locales/tw.json";
import us from "@/locales/us.json";

type MessageSchema = typeof tw;

import type {
  Composer,
  I18n,
  I18nMode,
  I18nOptions,
  Locale,
  VueI18n
} from "vue-i18n";

export const SUPPORT_LOCALES = ["tw", "us"];

function isComposer(
  instance: VueI18n | Composer,
  mode: I18nMode
): instance is Composer {
  return mode === "composition" && isRef(instance.locale);
}

export function getLocale(i18n: I18n): string {
  if (isComposer(i18n.global, i18n.mode)) {
    return i18n.global.locale.value;
  } else {
    return i18n.global.locale;
  }
}

export function setLocale(i18n: I18n, locale: Locale): void {
  if (isComposer(i18n.global, i18n.mode)) {
    i18n.global.locale.value = locale;
  } else {
    i18n.global.locale = locale;
  }
}

export function setupI18n(): I18n {
  const options: I18nOptions = {
    legacy: false,
    locale: "tw"
  };

  addMsgToOption(options, "tw", tw);
  addMsgToOption(options, "us", us);

  const i18n = createI18n(options);
  setI18nLanguage(i18n, options.locale!);
  return i18n;
}

function addMsgToOption(
  options: I18nOptions,
  name: string,
  msg: MessageSchema
): I18nOptions {
  options.messages = options.messages || {};
  options.messages![name] = msg;
  return options;
}

export function setI18nLanguage(i18n: I18n, locale: Locale): void {
  setLocale(i18n, locale);
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  document.querySelector("html")!.setAttribute("lang", locale);
}
