const { memoize } = require('@kmamal/util/function/memoize')
const { point } = require('./polygon/point')

const defineFor = memoize((Domain) => {
	const { abs, mul, div, eq, lte, fromNumber } = Domain
	const ZERO = fromNumber(0)
	const ONE = fromNumber(1)
	const TWO = fromNumber(2)
	const V2 = require('@kmamal/linear-algebra/vec2').defineFor(Domain)
	const { windingNumber } = require('./polygon/winding-number').defineFor(Domain)

	const pointInPoint = V2.eq

	const pointInCircle = (p, r) => lte(V2.normSquared(p), mul(r, r))

	const pointInHalfplane = (p, a, b) => {
		const ab = V2.sub(b, a)
		const ap = V2.sub(p, a)
		return lte(V2.cross(ab, ap), ZERO)
	}

	const pointInLine = (p, a, b) => {
		const ab = V2.sub(b, a)
		const ap = V2.sub(p, a)
		return eq(V2.cross(ab, ap), ZERO)
	}

	const pointInSegment = (p, a, b) => {
		const ab = V2.sub(b, a)
		const ap = V2.sub(p, a)
		const onLine = eq(V2.cross(ab, ap), ZERO)
		if (!onLine) { return false }

		const h = div(V2.dot(ap, ab), V2.normSquared(ab))
		return lte(ZERO, h) && lte(h, ONE)
	}

	const pointInBox = (p, w, h) => {
		const x = abs(p[0])
		const y = abs(p[1])
		return lte(x, div(w, TWO)) && lte(y, div(h, TWO))
	}

	const pointInConvex = (p, polygon) => {
		const { length } = polygon
		const a = point(polygon, length - 2)
		const b = new Array(2)
		for (let i = 0; i < polygon.length; i += 2) {
			point.to(b, polygon, i)

			if (!pointInHalfplane(p, a, b)) { return false }

			V2.copy(a, b)
		}
		return true
	}

	const pointInPolygon = (p, polygon) => windingNumber(p, polygon) > 0

	return {
		pointInPoint,
		pointInCircle,
		pointInHalfplane,
		pointInLine,
		pointInSegment,
		pointInBox,
		pointInConvex,
		pointInPolygon,
	}
})

module.exports = { defineFor }
