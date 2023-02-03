
const { withSentryConfig } = require('@sentry/nextjs');
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value:
      "default-src * 'self' data: 'unsafe-inline' 'unsafe-hashes' 'unsafe-eval'; script-src * data: 'unsafe-inline' 'unsafe-hashes' 'unsafe-eval' blob:; style-src * data: 'unsafe-inline' 'unsafe-hashes'; img-src * data:; media-src *  blob:",
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'Permissions-Policy',
    value: 'browsing-topics=()'
  }
];
const moduleExports = {
  sentry: {
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
const sentryWebpackPluginOptions = {
  silent: true,
};
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);

// module.exports = {
//   reactStrictMode: true,
//   swcMinify: true,
//   i18n: {
//     locales: ['en'],
//     defaultLocale: 'en',
//   },
// }












