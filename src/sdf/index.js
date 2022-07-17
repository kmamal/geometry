const { memoize } = require('@kmamal/util/function/memoize')

const defineFor = memoize((Domain) => ({
	...require('./from-point').defineFor(Domain),
	...require('./from-circle').defineFor(Domain),
	...require('./from-halfplane').defineFor(Domain),
	...require('./from-line').defineFor(Domain),
	...require('./from-segment').defineFor(Domain),
	...require('./from-box').defineFor(Domain),
	...require('./from-convex').defineFor(Domain),
	...require('./from-polygon').defineFor(Domain),
}))

module.exports = { defineFor }
