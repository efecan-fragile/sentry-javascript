import { captureException } from '@sentry/core';
import { isExpectedError } from './helpers.js';

/**
 * A decorator to wrap user-defined exception filters and add Sentry error reporting.
 */
function WithSentry() {
  return function (target, propertyKey, descriptor) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const originalCatch = descriptor.value ;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    descriptor.value = function (exception, host, ...args) {
      if (isExpectedError(exception)) {
        return originalCatch.apply(this, args);
      }

      captureException(exception);
      return originalCatch.apply(this, args);
    };

    return descriptor;
  };
}

export { WithSentry };
//# sourceMappingURL=error-decorator.js.map
