const { memoize } = require('@kmamal/util/function/memoize')
const { UpperRight } = require('@kmamal/triangular')
const { point } = require('../point')

const defineFor = memoize((Domain) => {
	const { add, lt, PInfinity } = Domain
	const V2 = require('@kmamal/linear-algebra/vec2').defineFor(Domain)
	const { isInteriorEdge } = require('../is-interior-edge').defineFor(Domain)

	const optimalTriangulation = (polygon) => {
		const { length } = polygon
		if (length < 6) { return [] }

		const n = length / 2
		const weights = new UpperRight(n - 1)

		const a = new Array(2)
		const b = new Array(2)
		const ab = new Array(2)
		let prev = 0
		let halfPrev = 0
		for (let i = 2; i < length; i += 2) {
			const halfI = i / 2
			point.to(a, polygon, i)

			point.to(b, polygon, prev)
			V2.sub.to(ab, b, a)
			weights.set(halfI - 1, halfPrev, { w: V2.normSquared(ab), k: null })

			for (let j = i - 4; j >= 0; j -= 2) {
				const halfJ = j / 2
				point.to(b, polygon, j)

				if (!isInteriorEdge(polygon, i, j)) {
					weights.set(halfI - 1, halfJ, { w: PInfinity, k: null })
					if (!(i === length - 2 && j == 0)) { continue }
				}

				V2.sub.to(ab, b, a)
				const abWeight = V2.normSquared(ab)

				let minAcbWeight = PInfinity
				let minHalfK = PInfinity
				for (let k = j + 2; k < i; k += 2) {
					const kHalf = k / 2
					const acWeight = weights.get(halfI - 1, kHalf).w
					const cbWeight = weights.get(kHalf - 1, halfJ).w
					const acbWeight = add(acWeight, cbWeight)
					if (lt(acbWeight, minAcbWeight)) {
						minAcbWeight = acbWeight
						minHalfK = kHalf
					}
				}

				const w = add(abWeight, minAcbWeight)
				weights.set(halfI - 1, halfJ, { w, k: minHalfK })
			}

			prev = i
			halfPrev = halfI
		}

		const triangles = new Array(n - 2)
		let writeIndex = 0
		const stack = [ { i: n - 1, j: 0 } ]
		while (stack.length > 0) {
			const { i, j } = stack.pop()
			const { k } = weights.get(i - 1, j)
			if (k === null) { continue }
			triangles[writeIndex++] = [ i * 2, j * 2, k * 2 ]
			stack.push({ i, j: k })
			stack.push({ i: k, j })
		}

		return triangles
	}

	return { optimalTriangulation }
})

module.exports = { defineFor }
