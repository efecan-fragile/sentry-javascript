Object.defineProperty(exports, '__esModule', { value: true });

const core = require('@sentry/core');
const helpers = require('./helpers.js');

/**
 * A decorator to wrap user-defined exception filters and add Sentry error reporting.
 */
function WithSentry() {
  return function (target, propertyKey, descriptor) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const originalCatch = descriptor.value ;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    descriptor.value = function (exception, host, ...args) {
      if (helpers.isExpectedError(exception)) {
        return originalCatch.apply(this, args);
      }

      core.captureException(exception);
      return originalCatch.apply(this, args);
    };

    return descriptor;
  };
}

exports.WithSentry = WithSentry;
//# sourceMappingURL=error-decorator.js.map
