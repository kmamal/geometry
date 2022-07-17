/* eslint-disable array-element-newline */

const { memoize } = require('@kmamal/util/function/memoize')

const defineFor = memoize((Domain) => {
	const { neg, div, cos, sin, acos, fromNumber } = Domain
	const ZERO = fromNumber(0)
	const ONE = fromNumber(1)
	const Scaling = require('./scaling').defineFor(Domain)

	const toMatrix = (angle) => {
		const s = sin(angle)
		const c = cos(angle)
		return [
			c, neg(s), ZERO,
			s, c, ZERO,
			ZERO, ZERO, ONE,
		]
	}

	const fromMatrix = (matrix) => {
		const [ w ] = Scaling.fromMatrix(matrix)
		const [ m11 ] = matrix
		return acos(div(m11, w))
	}

	return {
		toMatrix,
		fromMatrix,
	}
})

module.exports = { defineFor }
