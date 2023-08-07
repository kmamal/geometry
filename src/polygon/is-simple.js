const { memoize } = require('@kmamal/util/function/memoize')
const { point } = require('./point')
const { heapifyWith, popWith } = require('@kmamal/heap')

const defineFor = memoize((Domain) => {
	const { sub, eq, lte, fromNumber } = Domain
	const ZERO = fromNumber(0)
	const SDF = require('../sdf').defineFor(Domain)

	const fnCmpEndpoints = (u, v) => {
		const dy = sub(v.p[1], u.p[1])
		if (!eq(dy, ZERO)) { return dy }
		return sub(u.p[0], v.p[0])
	}

	const isSimple = (polygon) => {
		const { length } = polygon
		const endpoints = new Array(length)
		{
			let a = point(polygon, length - 2)
			let b
			let index = 0
			while (index < length) {
				b = point(polygon, index)

				const edgeKey = index
				endpoints[index++] = { p: a, a, b, edgeKey }
				endpoints[index++] = { p: b, a, b, edgeKey }

				a = b
			}
		}
		heapifyWith(endpoints, fnCmpEndpoints)

		// Scanline
		const activeEdges = new Map()
		while (endpoints.length > 0) {
			const endpoint = popWith(endpoints, fnCmpEndpoints)
			const { edgeKey } = endpoint

			const hadEdge = activeEdges.delete(edgeKey)
			if (hadEdge) { continue }

			const { a: a1, b: b1 } = endpoint
			for (const [ otherKey, other ] of activeEdges.entries()) {
				const { a: a2, b: b2 } = other
				const offset = otherKey - edgeKey
				if (offset === 2) {
					if (eq(SDF.point2segmentSquared(a1, a2, b2), ZERO)) { return false }
				} else if (offset === -2 || offset === length - 2) {
					if (eq(SDF.point2segmentSquared(b1, a2, b2), ZERO)) { return false }
				} else if (lte(SDF.segment2segment(a1, b1, a2, b2), ZERO)) { return false }
			}

			activeEdges.set(edgeKey, endpoint)
		}

		return true
	}

	return { isSimple }
})

module.exports = { defineFor }
