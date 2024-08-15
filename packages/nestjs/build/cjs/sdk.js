Object.defineProperty(exports, '__esModule', { value: true });

const core = require('@sentry/core');
const Sentry = require('@sentry/node');

/**
 * Initializes the NestJS SDK
 */
function init(options = {}) {
  const opts = {
    ...options,
  };

  core.applySdkMetadata(opts, 'nestjs');

  return Sentry.init(opts);
}

exports.init = init;
//# sourceMappingURL=sdk.js.map
