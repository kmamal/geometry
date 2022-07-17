/* eslint-disable array-element-newline */

const { memoize } = require('@kmamal/util/function/memoize')

const defineFor = memoize((Domain) => {
	const { fromNumber } = Domain
	const ZERO = fromNumber(0)
	const ONE = fromNumber(1)

	const toMatrix = ([ x, y ]) => [
		ONE, ZERO, x,
		ZERO, ONE, y,
		ZERO, ZERO, ONE,
	]

	const fromMatrix = ([
		, , x,
		, , y,
	]) => [ x, y ]

	return {
		toMatrix,
		fromMatrix,
	}
})

module.exports = { defineFor }
