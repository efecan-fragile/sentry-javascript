import { applySdkMetadata } from '@sentry/core';
import { init as init$1 } from '@sentry/node';

/**
 * Initializes the NestJS SDK
 */
function init(options = {}) {
  const opts = {
    ...options,
  };

  applySdkMetadata(opts, 'nestjs');

  return init$1(opts);
}

export { init };
//# sourceMappingURL=sdk.js.map
