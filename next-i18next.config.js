module.exports = {
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
  },
  fallbackLng: {
    default: ['zh'],
  },
  debug: false,
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}