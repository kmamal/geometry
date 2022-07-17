const { memoize } = require('@kmamal/util/function/memoize')

const defineFor = memoize((Domain) => {
	const { eq } = Domain

	const isEqual = (a, b) => {
		const { length } = a
		if (b.length !== length) { return false }

		nextOffset:
		for (let offset = 0; offset < length; offset += 2) {
			for (let i = 0; i < length; i++) {
				const aa = a[i]
				const bb = b[(i + offset) % length]
				if (!eq(aa, bb)) { continue nextOffset }
			}
			return true
		}

		return false
	}

	return { isEqual }
})

module.exports = { defineFor }
