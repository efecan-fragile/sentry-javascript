import type { ArgumentsHost, CallHandler, DynamicModule, ExecutionContext, NestInterceptor, OnModuleInit } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import type { Observable } from 'rxjs';
/**
 * Note: We cannot use @ syntax to add the decorators, so we add them directly below the classes as function wrappers.
 */
/**
 * Interceptor to add Sentry tracing capabilities to Nest.js applications.
 */
declare class SentryTracingInterceptor implements NestInterceptor {
    static readonly __SENTRY_INTERNAL__ = true;
    /**
     * Intercepts HTTP requests to set the transaction name for Sentry tracing.
     */
    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown>;
}
export { SentryTracingInterceptor };
/**
 * Global filter to handle exceptions and report them to Sentry.
 */
declare class SentryGlobalFilter extends BaseExceptionFilter {
    static readonly __SENTRY_INTERNAL__ = true;
    /**
     * Catches exceptions and reports them to Sentry unless they are expected errors.
     */
    catch(exception: unknown, host: ArgumentsHost): void;
}
export { SentryGlobalFilter };
/**
 * Service to set up Sentry performance tracing for Nest.js applications.
 */
declare class SentryService implements OnModuleInit {
    static readonly __SENTRY_INTERNAL__ = true;
    /**
     * Initializes the Sentry service and registers span attributes.
     */
    onModuleInit(): void;
}
export { SentryService };
/**
 * Set up a root module that can be injected in nest applications.
 */
declare class SentryModule {
    /**
     * Configures the module as the root module in a Nest.js application.
     */
    static forRoot(): DynamicModule;
}
export { SentryModule };
//# sourceMappingURL=setup.d.ts.map