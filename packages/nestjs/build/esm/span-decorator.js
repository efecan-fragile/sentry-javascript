import { startSpan } from '@sentry/node';

/**
 * A decorator usable to wrap arbitrary functions with spans.
 */
function SentryTraced(op = 'function') {
  return function (target, propertyKey, descriptor) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const originalMethod = descriptor.value ; // function can be sync or async

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    descriptor.value = function (...args) {
      return startSpan(
        {
          op: op,
          name: propertyKey,
        },
        () => {
          return originalMethod.apply(this, args);
        },
      );
    };
    return descriptor;
  };
}

export { SentryTraced };
//# sourceMappingURL=span-decorator.js.map
