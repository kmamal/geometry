const { memoize } = require('@kmamal/util/function/memoize')
const { point } = require('../polygon/point')


const defineFor = memoize((Domain) => {
	const V2 = require('@kmamal/linear-algebra/vec2').defineFor(Domain)
	const Point = require('./from-point').defineFor(Domain)

	const line2lineSquared = (a1, b1, a2, b2) => {
		const ab1 = V2.sub(b1, a1)
		const ab2 = V2.sub(b2, a2)
		const areCrossing = V2.cross(ab1, ab2) !== 0
		return areCrossing ? 0 : Point.point2lineSquared(a2, a1, b1)
	}

	const line2line = (a1, b1, a2, b2) => Math.sqrt(line2lineSquared(a1, b1, a2, b2))

	const line2segment = (a1, b1, a2, b2) => {
		const da = Point.point2halfplane(a2, a1, b1)
		const db = Point.point2halfplane(b2, a1, b1)
		const sign = Math.sign(da * db)
		return sign * Math.min(Math.abs(da), Math.abs(db))
	}

	const line2box = (a, b, w, h) => {
		const hw = w / 2
		const hh = h / 2
		/* eslint-disable comma-spacing */
		const box = [ -hw,-hh, -hw,hh, hw,hh, hw,-hh ]
		/* eslint-enable comma-spacing */

		return line2convex(a, b, box)
	}

	const line2polygon = (a, b, polygon) => {
		let minDistance = Infinity
		let maxDistance = -Infinity

		const p = new Array(2)
		for (let i = 0; i < polygon.length; i += 2) {
			point.to(p, polygon, i)
			const distance = Point.point2halfplane(p, a, b)
			minDistance = Math.min(minDistance, distance)
			maxDistance = Math.max(maxDistance, distance)
		}

		return minDistance * maxDistance < 0
			? Math.max(minDistance, -maxDistance)
			: Math.min(Math.abs(minDistance), Math.abs(maxDistance))
	}

	const line2convex = line2polygon

	return {
		line2lineSquared,
		line2line,
		line2segment,
		line2box,
		line2convex,
		line2polygon,
	}
})

module.exports = { defineFor }
