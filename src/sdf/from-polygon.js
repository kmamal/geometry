const { memoize } = require('@kmamal/util/function/memoize')

const defineFor = memoize((Domain) => {
	const Minkowski = require('../polygon/minkowski').defineFor(Domain)
	const Point = require('./from-point').defineFor(Domain)

	const ORIGIN = [ 0, 0 ]

	const polygon2polygon = (a, b) => {
		const diff = Minkowski.diffPolygonPolygon(a, b)
		return Point.point2polygon(ORIGIN, diff)
	}

	return { polygon2polygon }
})

module.exports = { defineFor }
