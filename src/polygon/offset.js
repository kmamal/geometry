const { memoize } = require('@kmamal/util/function/memoize')
const { __point, point } = require('./point')

const defineFor = memoize((Domain) => {
	const { abs, add, div, cos, fromNumber } = Domain
	const TWO = fromNumber(2)
	const V2 = require('../../../linear-algebra/vec2').defineFor(Domain)
	const { edgeNormal, pointNormalFromEdgeNormals } = require('./normal').defineFor(Domain)

	const offsetPoints$$$ = (polygon, amount) => {
		const { length } = polygon
		if (length < 4) { return polygon }

		let n1 = edgeNormal(polygon, length - 2)
		let n2 = new Array(2)
		for (let i = 0; i < length; i += 2) {
			const x = polygon[i + 0]
			const y = polygon[i + 1]

			edgeNormal.to(n2, polygon, i)

			const diff = pointNormalFromEdgeNormals(n1, n2)
			const angle = V2.angle2(n1, n2)
			V2.scale.$$$(diff, div(amount, abs(cos(div(angle, TWO)))))

			polygon[i + 0] = add(x, diff[0])
			polygon[i + 1] = add(y, diff[1])

			const tmp = n1
			n1 = n2
			n2 = tmp
		}

		return polygon
	}

	const offsetPoints = (polygon, amount) => {
		const res = polygon.slice()
		offsetPoints$$$(res, amount)
		return res
	}

	offsetPoints.$$$ = offsetPoints$$$

	const offsetEdges = (polygon, amount) => {
		if (polygon.length < 4) { return polygon }

		const res = new Array(polygon.length * 2)
		let writeIndex = 0

		const { length } = polygon
		let a = point(polygon, 0)
		let b = new Array(2)
		for (let i = 0; i < length; i += 2) {
			__point(b, polygon, (i + 2) % length)

			const diff = edgeNormal(polygon, i)
			V2.scale.$$$(diff, amount)

			const [ dx, dy ] = diff
			res[writeIndex++] = add(a[0], dx)
			res[writeIndex++] = add(a[1], dy)
			res[writeIndex++] = add(b[0], dx)
			res[writeIndex++] = add(b[1], dy)

			const tmp = a
			a = b
			b = tmp
		}

		return res
	}

	return {
		offsetPoints,
		offsetEdges,
	}
})

module.exports = { defineFor }
