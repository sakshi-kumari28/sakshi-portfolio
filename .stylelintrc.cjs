module.exports = {
  extends: [
    'stylelint-config-tailwindcss'
  ],
  rules: {
    // Allow Tailwind at-rules and directives
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen', 'layer']
      }
    ]
  }
};
