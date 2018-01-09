// dependencies
var stylelint = require('stylelint')
var beforeBlockString = require('stylelint/lib/utils/beforeBlockString')

// plugin settings
var ruleName = 'fdruide/selector-last-no-trailing-comma'
var messages = stylelint.utils.ruleMessages(ruleName, {
    unexpected: (selector) => `Unexpected trailing ',' at selector : ${selector}`
})

// the main plugin rule
var ruleFunction = function(actual, options) {
  return function postCssPlugin(root, result) {
    var validOptions = stylelint.utils.validateOptions(result, ruleName, { actual })

    if (!validOptions) return

    root.walkRules(check);
    function check(statement) {
        if (typeof statement.selector === 'undefined' || !statement.selector.endsWith(',')) {
            return;
        }

      let index = 1;//beforeBlockString(statement, { noRawBefore: true }).length;

      stylelint.utils.report({
        message: messages.unexpected(beforeBlockString(statement)),
        node: statement,
        result,
        ruleName
      });
    }
  }
}

// main plugin export
module.exports = stylelint.createPlugin(ruleName, ruleFunction)

// other exports
module.exports.ruleName = ruleName
module.exports.messages = messages