const { memoize } = require('@kmamal/util/function/memoize')
const { point } = require('../polygon/point')


const defineFor = memoize((Domain) => {
	const V2 = require('@kmamal/linear-algebra/vec2').defineFor(Domain)
	const Point = require('./from-point').defineFor(Domain)

	const halfplane2halfplane = (a1, b1, a2, b2) => {
		const ab1 = V2.sub(b1, a1)
		const ab2 = V2.sub(b2, a2)
		const areCrossing = V2.cross(ab1, ab2) !== 0
		if (areCrossing) { return 0 }
		const areOverlapping = V2.dot(ab1, ab2) > 0
		if (areOverlapping) { return -Infinity }
		return Point.point2halfplane(a1, a2, b2)
	}

	const halfplane2line = (a1, b1, a2, b2) => {
		const ab1 = V2.sub(b1, a1)
		const ab2 = V2.sub(b2, a2)
		const areCrossing = V2.cross(ab1, ab2) !== 0
		return areCrossing ? 0 : Point.point2halfplane(a2, a1, b1)
	}

	const halfplane2segment = (a1, b1, a2, b2) => Math.min(
		Point.point2halfplane(a2, a1, b1),
		Point.point2halfplane(b2, a1, b1),
	)

	const halfplane2box = (a, b, w, h) => {
		const hw = w / 2
		const hh = h / 2
		/* eslint-disable comma-spacing */
		const box = [ -hw,-hh, -hw,hh, hw,hh, hw,-hh ]
		/* eslint-enable comma-spacing */

		return halfplane2convex(a, b, box)
	}

	const halfplane2polygon = (a, b, polygon) => {
		let d = Infinity

		const p = new Array(2)
		for (let i = 0; i < polygon.length; i += 2) {
			point.to(p, polygon, i)
			d = Math.min(d, Point.point2halfplane(p, a, b))
		}

		return d
	}

	const halfplane2convex = halfplane2polygon

	return {
		halfplane2halfplane,
		halfplane2line,
		halfplane2segment,
		halfplane2box,
		halfplane2convex,
		halfplane2polygon,
	}
})

module.exports = { defineFor }
