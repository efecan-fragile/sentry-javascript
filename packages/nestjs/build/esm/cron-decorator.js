import * as Sentry from '@sentry/node';

/**
 * A decorator wrapping the native nest Cron decorator, sending check-ins to Sentry.
 */
const SentryCron = (monitorSlug, monitorConfig) => {
  return (target, propertyKey, descriptor) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const originalMethod = descriptor.value ;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    descriptor.value = function (...args) {
      return Sentry.withMonitor(
        monitorSlug,
        () => {
          return originalMethod.apply(this, args);
        },
        monitorConfig,
      );
    };
    return descriptor;
  };
};

export { SentryCron };
//# sourceMappingURL=cron-decorator.js.map
