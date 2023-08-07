const { memoize } = require('@kmamal/util/function/memoize')

const defineFor = memoize((Domain) => {
	const { eq, lt, min, mul, div, sqrt, fromNumber } = Domain
	const MINUS_ONE = fromNumber(-1)
	const ZERO = fromNumber(0)
	const ONE = fromNumber(1)
	const V2 = require('@kmamal/linear-algebra/vec2').defineFor(Domain)
	const Point = require('./from-point').defineFor(Domain)
	const Convex = require('./from-convex').defineFor(Domain)

	const segment2segment = (a1, b1, a2, b2) => {
		const a1b1 = V2.sub(b1, a1)
		const a2b2 = V2.sub(b2, a2)
		const a2a1 = V2.sub(a1, a2)

		let sign = MINUS_ONE
		findIintersection: {
			const det = V2.cross(a1b1, a2b2)
			if (eq(det, ZERO)) {
				sign = ONE
				break findIintersection
			}

			const t1 = div(V2.cross(a2b2, a2a1), det)
			if (lt(t1, ZERO) || lt(ONE, t1)) {
				sign = ONE
				break findIintersection
			}
			const t2 = div(V2.cross(a1b1, a2a1), det)
			if (lt(t2, ZERO) || lt(ONE, t2)) {
				sign = ONE
				break findIintersection
			}
		}

		return mul(sign, sqrt(min(
			min(
				Point.point2segmentSquared(a2, a1, b1),
				Point.point2segmentSquared(b2, a1, b1),
			),
			min(
				Point.point2segmentSquared(a1, a2, b2),
				Point.point2segmentSquared(b1, a2, b2),
			),
		)))
	}

	const segment2box = (a, b, w, h) => {
		const hw = div(w, 2)
		const hh = div(h, 2)
		/* eslint-disable comma-spacing */
		const box = [ -hw,-hh, -hw,hh, hw,hh, hw,-hh ]
		/* eslint-enable comma-spacing */

		return segment2convex(a, b, box)
	}

	const segment2convex = (a, b, polygon) => {
		const segment = [ a[0], a[1], b[0], b[1] ]
		return Convex.convex2convex(segment, polygon)
	}

	const segment2polygon = (a, b, polygon) => {
		const segment = [ a[0], a[1], b[0], b[1] ]
		return Convex.convex2polygon(segment, polygon)
	}

	return {
		segment2segment,
		segment2box,
		segment2convex,
		segment2polygon,
	}
})

module.exports = { defineFor }
