const { memoize } = require('@kmamal/util/function/memoize')

const defineFor = memoize((Domain) => {
	const Point = require('./from-point').defineFor(Domain)

	const circle2circle = (c, r, r2) => Point.point2circle(c, r2) - r
	const circle2halfplane = (c, r, a, b) => Point.point2halfplane(c, a, b) - r
	const circle2line = (c, r, a, b) => Point.point2line(c, a, b) - r
	const circle2segment = (c, r, a, b) => Point.point2segment(c, a, b) - r
	const circle2box = (c, r, w, h) => Point.point2box(c, w, h) - r
	const circle2convex = (c, r, polygon) => Point.point2convex(c, polygon) - r
	const circle2polygon = (c, r, polygon) => Point.point2polygon(c, polygon) - r

	return {
		circle2circle,
		circle2halfplane,
		circle2line,
		circle2segment,
		circle2box,
		circle2convex,
		circle2polygon,
	}
})

module.exports = { defineFor }
