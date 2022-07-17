const { memoize } = require('@kmamal/util/function/memoize')

const defineFor = memoize((Domain) => {
	const { min, max, PInfinity, NInfinity } = Domain

	const boundingBox = (polygon) => {
		let minX = PInfinity
		let maxX = NInfinity
		let minY = PInfinity
		let maxY = NInfinity
		for (let i = 0; i < polygon.length; i += 2) {
			const x = polygon[i + 0]
			const y = polygon[i + 1]
			minX = min(minX, x)
			maxX = max(maxX, x)
			minY = min(minY, y)
			maxY = max(maxY, y)
		}
		return {
			left: minX,
			right: maxX,
			top: maxY,
			bottom: minY,
		}
	}

	return { boundingBox }
})

module.exports = { defineFor }
