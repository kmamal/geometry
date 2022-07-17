const { memoize } = require('@kmamal/util/function/memoize')
const { __min } = require('@kmamal/util/array/min')

const defineFor = memoize((Domain) => {
	const { eq, gt, lte } = Domain
	const V2 = require('../../../linear-algebra/vec2').defineFor(Domain)

	const __jarvisMarchConvexHull = (dst, dstStart, src, srcStart, srcEnd) => {
		const a = src[__min(src, srcStart, srcEnd, ([ x ]) => x).index]
		let b = a
		const ab = [ 0, 1 ]

		let writeIndex = dstStart
		dst[writeIndex++] = a

		let c
		const bc = new Array(2)
		const bp = new Array(2)

		for (;;) {
			let minAngle = Infinity
			let bcNorm = -Infinity

			let readIndex = srcStart
			while (readIndex !== srcEnd) {
				const p = src[readIndex++]
				if (V2.eq(p, b)) { continue }

				V2.sub.to(bp, p, b)
				const angle = V2.angle2(bp, ab)
				if (gt(angle, minAngle)) { continue }

				const bpNorm = V2.normSquared(bp)
				if (eq(angle, minAngle) && lte(bpNorm, bcNorm)) { continue }

				minAngle = angle
				c = p
				V2.copy(bc, bp)
				bcNorm = bpNorm
			}

			if (V2.eq(c, a)) { break }
			dst[writeIndex++] = c

			b = c
			V2.copy(ab, bc)
		}

		const hullLength = writeIndex - dstStart
		if (hullLength < 3) { return null }
		return hullLength
	}

	const jarvisMarchConvexHull = (points) => {
		const { length } = points
		if (length < 3) { return null }
		const res = []
		const n = __jarvisMarchConvexHull(res, 0, points, 0, points.length)
		if (n === null) { return null }
		return res
	}

	return {
		__jarvisMarchConvexHull,
		jarvisMarchConvexHull,
	}
})

module.exports = { defineFor }
