const { memoize } = require('@kmamal/util/function/memoize')
const { point } = require('./point')

const defineFor = memoize((Domain) => {
	const { sub, eq, lt, lte, fromNumber } = Domain
	const ZERO = fromNumber(0)
	const V2 = require('@kmamal/linear-algebra/vec2').defineFor(Domain)

	const windingNumber = (p, polygon) => {
		let number = 0
		const py = p[1]

		const { length } = polygon
		const a = point(polygon, length - 2)
		const b = new Array(2)
		const ab = new Array(2)
		const ap = new Array(2)
		for (let i = 0; i < length; i += 2) {
			point.to(b, polygon, i)

			checkEdge: {
				V2.sub.to(ab, b, a)
				V2.sub.to(ap, p, a)

				if (eq(ab[1], ZERO)) {
					if (eq(ap[1], ZERO) && lt(ab[0], ap[0]) && lte(ap[0], ZERO)) {
						number += 1
					}
					break checkEdge
				}

				if (V2.eq(a, p)) {
					number += 1
					break checkEdge
				}

				const startsAbove = lte(ap[1], ZERO)
				const endsBelow = lt(sub(b[1], py), ZERO)
				const isInside = lte(V2.cross(ab, ap), ZERO)

				if (startsAbove && endsBelow && isInside) {
					number += 1
				} else if (!startsAbove && !endsBelow && !isInside) {
					number -= 1
				}
			}

			V2.copy(a, b)
		}

		return number
	}

	return { windingNumber }
})

module.exports = { defineFor }
