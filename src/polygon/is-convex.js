const { memoize } = require('@kmamal/util/function/memoize')
const { point } = require('./point')


const defineFor = memoize((Domain) => {
	const { gt, fromNumber } = Domain
	const ZERO = fromNumber(0)
	const V2 = require('@kmamal/linear-algebra/vec2').defineFor(Domain)

	const isConvex = (polygon) => {
		const { length } = polygon

		const a = point(polygon, length - 4)
		const b = point(polygon, length - 2)
		const ab = V2.sub(b, a)
		const c = new Array(2)
		const bc = new Array(2)
		for (let i = 0; i < length; i += 2) {
			point.to(c, polygon, i)

			V2.sub.to(bc, c, b)
			const cross = V2.cross(ab, bc)
			if (gt(cross, ZERO)) { return false }

			V2.copy(b, c)
			V2.copy(ab, bc)
		}

		return true
	}

	return { isConvex }
})

module.exports = { defineFor }
