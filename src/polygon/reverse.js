const { swap } = require('@kmamal/util/array/swap')

const reverse$$$ = (polygon) => {
	for (let i = 0, j = polygon.length - 2; i < j; i += 2, j -= 2) {
		swap.$$$(polygon, i + 0, j + 0)
		swap.$$$(polygon, i + 1, j + 1)
	}
	return polygon
}

const reverse = (polygon) => {
	const { length } = polygon
	const result = new Array(length)
	const offsetX = length - 2
	const offsetY = length - 1
	for (let i = 0; i < length; i += 2) {
		result[offsetX - i] = polygon[i + 0]
		result[offsetY - i] = polygon[i + 1]
	}
	return result
}

reverse.$$$ = reverse$$$

const defineFor = () => ({ reverse })

module.exports = { defineFor }
