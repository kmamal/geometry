const { memoize } = require('@kmamal/util/function/memoize')
const { point } = require('./point')

const defineFor = memoize((Domain) => {
	const { lt, gte, lte, fromNumber } = Domain
	const ZERO = fromNumber(0)
	const V2 = require('../../../linear-algebra/vec2').defineFor(Domain)
	const SDF = require('../sdf').defineFor(Domain) // TODO: collision

	const isInteriorEdge = (polygon, _ai, _bi) => {
		let ai
		let bi
		if (_ai > _bi) {
			ai = _bi
			bi = _ai
		} else {
			ai = _ai
			bi = _bi
		}

		const { length } = polygon
		const a = point(polygon, ai)
		const b = point(polygon, bi)

		{
			const c = point(polygon, (length + ai - 2) % length)
			const d = point(polygon, ai + 2)
			const ab = V2.sub(b, a)
			const ac = V2.sub(c, a)
			const ad = V2.sub(d, a)
			if (lt(V2.cross(ac, ad), ZERO)) {
				if (lte(V2.cross(ac, ab), ZERO) && gte(V2.cross(ad, ab), ZERO)) { return false }
			} else if (lte(V2.cross(ac, ab), ZERO) || gte(V2.cross(ad, ab), ZERO)) { return false }
		}

		{
			let ci = ai + 2
			let di = ci + 2
			const c = point(polygon, ci)
			const d = new Array(2)

			while (di < bi) {
				point.to(d, polygon, di)
				if (lte(SDF.segment2segment(a, b, c, d), ZERO)) { return false }
				V2.copy(c, d)
				di += 2
			}

			ci = (bi + 2) % length
			point.to(c, polygon, ci)
			di = (ci + 2) % length

			if (di > bi) {
				while (di < length) {
					point.to(d, polygon, di)
					if (lte(SDF.segment2segment(a, b, c, d), ZERO)) { return false }
					V2.copy(c, d)
					di += 2
				}
			}

			while (di < ai) {
				point.to(d, polygon, di)
				if (lte(SDF.segment2segment(a, b, c, d), ZERO)) { return false }
				V2.copy(c, d)
				di += 2
			}
		}

		return true
	}

	return { isInteriorEdge }
})

module.exports = { defineFor }
