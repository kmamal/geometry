const { memoize } = require('@kmamal/util/function/memoize')

const defineFor = memoize((Domain) => {
	const { add, sub, mul, div, fromNumber } = Domain
	const ZERO = fromNumber(0)
	const THREE = fromNumber(3)

	const centroid = (polygon) => {
		const { length } = polygon
		let sumA = ZERO
		let sumX = ZERO
		let sumY = ZERO
		let ax = polygon[length - 2]
		let ay = polygon[length - 1]
		for (let i = 0; i < length; i += 2) {
			const bx = polygon[i + 0]
			const by = polygon[i + 1]

			sumA = add(sumA, mul(sub(bx, ax), add(by, ay)))
			const c = sub(mul(ax, by), mul(bx, ay))
			sumX = add(sumX, mul(add(ax, bx), c))
			sumY = add(sumY, mul(add(ay, by), c))

			ax = bx
			ay = by
		}
		return [
			div(sumX, mul(sumA, THREE)),
			div(sumY, mul(sumA, THREE)),
		]
	}

	return { centroid }
})

module.exports = { defineFor }
