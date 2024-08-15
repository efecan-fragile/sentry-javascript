Object.defineProperty(exports, '__esModule', { value: true });

const Sentry = require('@sentry/node');

/**
 * A decorator usable to wrap arbitrary functions with spans.
 */
function SentryTraced(op = 'function') {
  return function (target, propertyKey, descriptor) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const originalMethod = descriptor.value ; // function can be sync or async

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    descriptor.value = function (...args) {
      return Sentry.startSpan(
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

exports.SentryTraced = SentryTraced;
//# sourceMappingURL=span-decorator.js.map
