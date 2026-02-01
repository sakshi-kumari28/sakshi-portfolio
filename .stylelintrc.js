export default {
  extends: [
    'stylelint-config-tailwindcss'
  ],
  // Provide at least one rule so stylelint doesn't error when resolves extend
  rules: {
    // Allow Tailwind at-rules and directives
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen', 'layer']
      }
    ],
    // Add a fallback rule to ensure config is valid
    'block-no-empty': null
  }
};
