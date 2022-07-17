/* eslint-disable array-element-newline */

const { memoize } = require('@kmamal/util/function/memoize')

const defineFor = memoize((Domain) => {
	const { add, mul, div, sqrt, fromNumber } = Domain
	const ZERO = fromNumber(0)
	const ONE = fromNumber(1)

	const toMatrix = ([ w, h ]) => [
		w, ZERO, ZERO,
		ZERO, h, ZERO,
		ZERO, ZERO, ONE,
	]

	const fromMatrix = ([
		m11, , ,
		m12, m22,
	]) => {
		const w = sqrt(add(
			mul(m11, m11),
			mul(m12, m12),
		))
		const h = mul(w, div(m22, m11))
		return [ w, h ]
	}

	return {
		toMatrix,
		fromMatrix,
	}
})

module.exports = { defineFor }
