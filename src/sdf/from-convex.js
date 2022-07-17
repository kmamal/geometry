const { memoize } = require('@kmamal/util/function/memoize')


const defineFor = memoize((Domain) => {
	const Minkowski = require('../polygon/minkowski').defineFor(Domain)
	const Point = require('./from-point').defineFor(Domain)

	const ORIGIN = [ 0, 0 ]

	const convex2convex = (a, b) => {
		const diff = Minkowski.diffConvexConvex(a, b)
		return Point.point2convex(ORIGIN, diff)
	}

	const convex2polygon = (a, b) => {
		const diff = Minkowski.diffConvexPolygon(a, b)
		return Point.point2polygon(ORIGIN, diff)
	}

	return {
		convex2convex,
		convex2polygon,
	}
})

module.exports = { defineFor }
