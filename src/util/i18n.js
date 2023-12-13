import { createI18n } from "vue-i18n";
import zh from "@/locales/zh.json";
import en from "@/locales/en.json";
/* 
    legacy 开启Composition API模式
    locale 设定默认语言
    fallbackLocale 备用语言，当向其他语言转失败时，使用备用语言
    messages 语言库
*/
export default new createI18n({
    legacy: false,
    locale: 'zh',
    fallbackLocale: 'zh',
    messages: {
        zh,
        en,
    },
})