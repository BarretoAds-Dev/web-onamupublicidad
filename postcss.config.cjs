const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    purgecss({
      content: [
        './src/**/*.{html,js,jsx,ts,tsx,astro}',
      ],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      safelist: [/^bg-/, /^text-/],
    }),
    require('cssnano')({
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true,
          },
          normalizeWhitespace: true,
          mergeLonghand: true,
          mergeRules: true,
          reduceInitial: true,
          reduceTransforms: true,
          svgo: false,
          autoprefixer: false,
        },
      ],
    }),
  ],
};
