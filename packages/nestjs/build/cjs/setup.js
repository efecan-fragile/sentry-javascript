var {
  _optionalChain
} = require('@sentry/utils');

Object.defineProperty(exports, '__esModule', { value: true });

const common = require('@nestjs/common');
const core = require('@nestjs/core');
const core$1 = require('@sentry/core');
const utils = require('@sentry/utils');
const helpers = require('./helpers.js');

/**
 * Note: We cannot use @ syntax to add the decorators, so we add them directly below the classes as function wrappers.
 */

/**
 * Interceptor to add Sentry tracing capabilities to Nest.js applications.
 */
class SentryTracingInterceptor  {
  // used to exclude this class from being auto-instrumented
   static  __initStatic() {this.__SENTRY_INTERNAL__ = true;}

  /**
   * Intercepts HTTP requests to set the transaction name for Sentry tracing.
   */
   intercept(context, next) {
    if (core$1.getIsolationScope() === core$1.getDefaultIsolationScope()) {
      utils.logger.warn('Isolation scope is still the default isolation scope, skipping setting transactionName.');
      return next.handle();
    }

    if (context.getType() === 'http') {
      const req = context.switchToHttp().getRequest();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (req.route) {
        // eslint-disable-next-line @sentry-internal/sdk/no-optional-chaining,@typescript-eslint/no-unsafe-member-access
        core$1.getIsolationScope().setTransactionName(`${_optionalChain([req, 'access', _ => _.method, 'optionalAccess', _2 => _2.toUpperCase, 'call', _3 => _3()]) || 'GET'} ${req.route.path}`);
      }
    }

    return next.handle();
  }
}SentryTracingInterceptor.__initStatic();
common.Injectable()(SentryTracingInterceptor);

/**
 * Global filter to handle exceptions and report them to Sentry.
 */
class SentryGlobalFilter extends core.BaseExceptionFilter {
   static  __initStatic2() {this.__SENTRY_INTERNAL__ = true;}

  /**
   * Catches exceptions and reports them to Sentry unless they are expected errors.
   */
   catch(exception, host) {
    if (helpers.isExpectedError(exception)) {
      return super.catch(exception, host);
    }

    core$1.captureException(exception);
    return super.catch(exception, host);
  }
}SentryGlobalFilter.__initStatic2();
common.Catch()(SentryGlobalFilter);

/**
 * Service to set up Sentry performance tracing for Nest.js applications.
 */
class SentryService  {
   static  __initStatic3() {this.__SENTRY_INTERNAL__ = true;}

  /**
   * Initializes the Sentry service and registers span attributes.
   */
   onModuleInit() {
    // Sadly, NestInstrumentation has no requestHook, so we need to add the attributes here
    // We register this hook in this method, because if we register it in the integration `setup`,
    // it would always run even for users that are not even using Nest.js
    const client = core$1.getClient();
    if (client) {
      client.on('spanStart', span => {
        addNestSpanAttributes(span);
      });
    }
  }
}SentryService.__initStatic3();
common.Injectable()(SentryService);

/**
 * Set up a root module that can be injected in nest applications.
 */
class SentryModule {
  /**
   * Configures the module as the root module in a Nest.js application.
   */
   static forRoot() {
    return {
      module: SentryModule,
      providers: [
        SentryService,
        {
          provide: core.APP_INTERCEPTOR,
          useClass: SentryTracingInterceptor,
        },
      ],
      exports: [SentryService],
    };
  }
}
common.Global()(SentryModule);
common.Module({
  providers: [
    SentryService,
    {
      provide: core.APP_INTERCEPTOR,
      useClass: SentryTracingInterceptor,
    },
  ],
  exports: [SentryService],
})(SentryModule);

function addNestSpanAttributes(span) {
  const attributes = core$1.spanToJSON(span).data || {};

  // this is one of: app_creation, request_context, handler
  const type = attributes['nestjs.type'];

  // If this is already set, or we have no nest.js span, no need to process again...
  if (attributes[core$1.SEMANTIC_ATTRIBUTE_SENTRY_OP] || !type) {
    return;
  }

  span.setAttributes({
    [core$1.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: 'auto.http.otel.nestjs',
    [core$1.SEMANTIC_ATTRIBUTE_SENTRY_OP]: `${type}.nestjs`,
  });
}

exports.SentryGlobalFilter = SentryGlobalFilter;
exports.SentryModule = SentryModule;
exports.SentryService = SentryService;
exports.SentryTracingInterceptor = SentryTracingInterceptor;
//# sourceMappingURL=setup.js.map
