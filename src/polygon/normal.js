const { memoize } = require('@kmamal/util/function/memoize')
const { point } = require('./point')

const defineFor = memoize((Domain) => {
	const { neg, sub, gt, fromNumber } = Domain
	const ZERO = fromNumber(0)
	const THIRD = fromNumber(1 / 3)
	const V2 = require('../../../linear-algebra/vec2').defineFor(Domain)
	const ORIGIN = V2.fromNumbers(0, 0)

	const edgeNormalTo = (dst, polygon, offset) => {
		const { length } = polygon
		const x1 = polygon[offset + 0]
		const y1 = polygon[offset + 1]
		const x2 = polygon[(offset + 2) % length]
		const y2 = polygon[(offset + 3) % length]
		const edgeX = sub(x2, x1)
		const edgeY = sub(y2, y1)
		dst[0] = neg(edgeY)
		dst[1] = edgeX
		return V2.normalize.$$$(dst)
	}

	const edgeNormal = (polygon, offset) => {
		const res = new Array(2)
		return edgeNormalTo(res, polygon, offset)
	}

	edgeNormal.to = edgeNormalTo

	const pointNormalFromEdgeNormalsTo = (dst, n1, n2) => {
		V2.add.to(dst, n1, n2)
		return V2.eq(dst, ORIGIN)
			? [ neg(n2[1]), n2[0] ]
			: V2.normalize.$$$(dst)
	}

	const pointNormalFromEdgeNormals = (n1, n2) => {
		const res = new Array(2)
		return pointNormalFromEdgeNormalsTo(res, n1, n2)
	}

	pointNormalFromEdgeNormals.to = pointNormalFromEdgeNormalsTo

	const pointNormalTo = (dst, polygon, offset) => {
		const { length } = polygon
		const n1 = edgeNormal(polygon, (offset + length - 2) % length)
		const n2 = edgeNormal(polygon, offset)
		return pointNormalFromEdgeNormalsTo(dst, n1, n2)
	}

	const pointNormal = (polygon, offset) => {
		const res = new Array(2)
		return pointNormalTo(res, polygon, offset)
	}

	pointNormal.to = pointNormalTo

	return {
		edgeNormal,
		pointNormal,
		pointNormalFromEdgeNormals,
	}
})

module.exports = { defineFor }
