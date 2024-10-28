// src/i18n.ts
import { createI18n } from 'vue-i18n';

// 导入翻译资源
import zh_TW from './locales/zh_TW.json';
import zh_CN from './locales/zh_CN.json';


// 创建 i18n 实例
const i18n = createI18n({
    locale: 'zh-CN', // 设置默认语言
    fallbackLocale: 'zh-TW', // 设置回退语言
    messages: {
        'zh-TW': zh_TW, // 国际服翻译资源
        'zh-CN': zh_CN  // 国服翻译资源
    }
});

export default i18n;