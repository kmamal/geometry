const { memoize } = require('@kmamal/util/function/memoize')
const { point } = require('../polygon/point')

const defineFor = memoize((Domain) => {
	const { abs, neg, sub, mul, div, sqrt, max, min, gt, gte, lte, PInfinity, fromNumber } = Domain
	const MINUS_ONE = fromNumber(-1)
	const ZERO = fromNumber(0)
	const ONE = fromNumber(1)
	const TWO = fromNumber(2)
	const V2 = require('../../../linear-algebra/vec2').defineFor(Domain)

	const point2pointSquared = (a, b) => V2.normSquared(V2.sub(a, b))

	const point2point = (a, b) => sqrt(point2pointSquared(a, b))

	const point2circle = (p, r) => sub(V2.norm(p), r)

	const point2halfplane = (p, a, b) => {
		const ab = V2.sub(b, a)
		const ap = V2.sub(p, a)
		return div(V2.cross(ab, ap), V2.norm(ab))
	}

	const point2lineSquared = (p, a, b) => {
		const ab = V2.sub(b, a)
		const ap = V2.sub(p, a)
		const c = V2.cross(ab, ap)
		return div(mul(c, c), V2.normSquared(ab))
	}

	const point2line = (p, a, b) => abs(point2halfplane(p, a, b))

	const point2segmentSquared = (p, a, b) => {
		const ab = V2.sub(b, a)
		const ap = V2.sub(p, a)
		const h = div(V2.dot(ap, ab), V2.normSquared(ab))
		const hClamped = max(ZERO, min(ONE, h))
		V2.scale.$$$(ab, hClamped)
		return V2.normSquared(V2.sub.$$$(ap, ab))
	}

	const point2segment = (p, a, b) => sqrt(point2segmentSquared(p, a, b))

	const point2box = ([ x, y ], w, h) => {
		const dx = sub(abs(x), div(w, TWO))
		const dy = sub(abs(y), div(h, TWO))
		if (gt(dx, ZERO)) {
			return gt(dy, ZERO) ? V2.norm([ dx, dy ]) : dx
		}
		return gt(dy, ZERO) ? dy : max(dx, dy)
	}

	const point2convex = (p, polygon) => {
		const { length } = polygon

		let sign = MINUS_ONE
		let ds = PInfinity

		const a = [
			polygon[length - 2],
			polygon[length - 1],
		]
		const b = new Array(2)
		const ab = new Array(2)
		const ap = new Array(2)
		for (let i = 0; i < length; i += 2) {
			point.to(b, polygon, i)

			ds = min(ds, point2segmentSquared(p, a, b))

			V2.sub.to(ab, b, a)
			V2.sub.to(ap, p, a)
			const isInside = lte(V2.cross(ab, ap), ZERO)
			if (!isInside) { sign = ONE }

			V2.copy(a, b)
		}
		return mul(sign, sqrt(ds))
	}

	const point2polygon = (p, polygon) => {
		const { length } = polygon

		let sign = ONE
		let ds = PInfinity

		const py = p[1]
		const a = [
			polygon[length - 2],
			polygon[length - 1],
		]
		const b = new Array(2)
		const ab = new Array(2)
		const ap = new Array(2)
		for (let i = 0; i < length; i += 2) {
			point.to(b, polygon, i)

			ds = min(ds, point2segmentSquared(p, a, b))

			const startsAbove = gte(a[1], py)
			const endsBelow = gt(py, b[1])
			V2.sub.to(ab, b, a)
			V2.sub.to(ap, p, a)
			const isInside = gt(V2.cross(ab, ap), ZERO)
			if (false
			|| (startsAbove && endsBelow && isInside)
			|| (!startsAbove && !endsBelow && !isInside)
			) {
				sign = neg(sign)
			}

			V2.copy(a, b)
		}
		return mul(sign, sqrt(ds))
	}

	return {
		point2pointSquared,
		point2point,
		point2circle,
		point2halfplane,
		point2lineSquared,
		point2line,
		point2segmentSquared,
		point2segment,
		point2box,
		point2convex,
		point2polygon,
	}
})

module.exports = { defineFor }
