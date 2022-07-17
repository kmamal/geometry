/* eslint-disable array-element-newline */

const { memoize } = require('@kmamal/util/function/memoize')

const defineFor = memoize((Domain) => {
	const { neg, add, mul, div, sqrt, sin, cos, acos, fromNumber } = Domain
	const ZERO = fromNumber(0)
	const ONE = fromNumber(1)

	const toMatrix = (translation, rotation, scaling) => {
		const [ x, y ] = translation
		const c = cos(rotation)
		const s = sin(rotation)
		const [ w, h ] = scaling

		return [
			mul(w, c), mul(h, neg(s)), x,
			mul(w, s), mul(h, c), y,
			ZERO, ZERO, ONE,
		]
	}

	const fromMatrix = (matrix) => {
		const [
			m11, , x,
			m12, m22, y,
		] = matrix
		const w = sqrt(add(mul(m11, m11), mul(m12, m12)))
		const h = mul(w, div(m22, m11))
		const c = div(m11, w)

		const translation = [ x, y ]
		const rotation = acos(c)
		const scaling = [ w, h ]
		return { translation, rotation, scaling }
	}

	return { toMatrix, fromMatrix }
})

module.exports = { defineFor }
