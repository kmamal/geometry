const { memoize } = require('@kmamal/util/function/memoize')

const defineFor = memoize((Domain) => {
	const { add, sub, mul, div, fromNumber } = Domain
	const ZERO = fromNumber(0)
	const TWO = fromNumber(2)

	const area = (polygon) => {
		const { length } = polygon
		let sum = ZERO
		let ax = polygon[length - 2]
		let ay = polygon[length - 1]
		for (let i = 0; i < length; i += 2) {
			const bx = polygon[i + 0]
			const by = polygon[i + 1]

			sum = add(sum, mul(sub(bx, ax), add(by, ay)))

			ax = bx
			ay = by
		}
		return div(sum, TWO)
	}

	return { area }
})

module.exports = { defineFor }
