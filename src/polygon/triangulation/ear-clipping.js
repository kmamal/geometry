const { memoize } = require('@kmamal/util/function/memoize')
const { binarySearch } = require('@kmamal/util/array/searching/binary')

const defineFor = memoize((Domain) => {
	const { isInteriorEdge } = require('../is-interior-edge').defineFor(Domain)

	const earClippingTriangulation = (polygon) => {
		const { length } = polygon
		if (length < 6) { return [] }

		const n = length / 2

		const remaining = new Array(n)
		for (let i = 0; i < n; i++) {
			remaining[i] = i * 2
		}

		const triangles = new Array(polygon.length / 2 - 2)
		let writeIndex = 0

		let ai = 0
		let bi = 2
		let ci = 4

		let remainingIndex = 3
		while (remaining.length > 3) {
			if (isInteriorEdge(polygon, ai, ci)) {
				triangles[writeIndex++] = [ ai, bi, ci ]
				const spliceIndex = binarySearch(remaining, bi)
				remaining.splice(spliceIndex, 1)
				if (remainingIndex > spliceIndex) {
					remainingIndex -= 1
				}
			} else {
				ai = bi
			}
			bi = ci
			ci = remaining[remainingIndex]
			remainingIndex = (remainingIndex + 1) % remaining.length
		}

		triangles[writeIndex++] = [ ai, bi, ci ]
		return triangles
	}

	return { earClippingTriangulation }
})

module.exports = { defineFor }
