Object.defineProperty(exports, '__esModule', { value: true });

const Sentry = require('@sentry/node');
const sdk = require('./sdk.js');
const spanDecorator = require('./span-decorator.js');
const cronDecorator = require('./cron-decorator.js');
const errorDecorator = require('./error-decorator.js');



exports.init = sdk.init;
exports.SentryTraced = spanDecorator.SentryTraced;
exports.SentryCron = cronDecorator.SentryCron;
exports.WithSentry = errorDecorator.WithSentry;
Object.prototype.hasOwnProperty.call(Sentry, '__proto__') &&
	!Object.prototype.hasOwnProperty.call(exports, '__proto__') &&
	Object.defineProperty(exports, '__proto__', {
		enumerable: true,
		value: Sentry['__proto__']
	});

Object.keys(Sentry).forEach(k => {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = Sentry[k];
});
//# sourceMappingURL=index.js.map
