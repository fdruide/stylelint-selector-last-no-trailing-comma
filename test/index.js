var testRule = require('stylelint-test-rule-tape');
var selectorLastNoTrailingComma = require('..');

// Just a couple of quick tests to ensure postcss-bem-linter
// is getting the hard work done

testRule(selectorLastNoTrailingComma.rule, {
  ruleName: selectorLastNoTrailingComma.ruleName,
  config: null,
  skipBasicChecks: true,

  accept: [
    { code: 'a,b {}' },
    { code: 'a {}' },
  ],

  reject: [
    {
      code: 'a,b,{}',
      message: 'Unexpected trailing \',\' at selector : a,b, (' + selectorLastNoTrailingComma.ruleName + ')',
    },
    {
        code: 'a, b, {}',
        message: 'Unexpected trailing \',\' at selector : a, b,  (' + selectorLastNoTrailingComma.ruleName + ')',
      },
  ],
});