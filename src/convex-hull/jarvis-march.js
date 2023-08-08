const { memoize } = require('@kmamal/util/function/memoize')
const { __min } = require('@kmamal/util/array/min')

const ab = new Array(2)
const bc = new Array(2)
const bp = new Array(2)

const defineFor = memoize((Domain) => {
	const { eq, neq, gt, lte, sub, PInfinity, NInfinity } = Domain
	const V2 = require('@kmamal/linear-algebra/vec2').defineFor(Domain)
	const UP = V2.fromNumbers(0, 1)

	const fnCmpPoints = (a, b) => {
		const dx = sub(a[0], b[0])
		if (neq(dx, 0)) { return dx }
		const dy = sub(a[1], b[1])
		return dy
	}


	const __jarvisMarchConvexHull = (dst, dstStart, src, srcStart, srcEnd) => {
		if (srcEnd - srcStart < 3) { return null }

		const fi = __min(src, srcStart, srcEnd, fnCmpPoints).index
		const f = src[fi]

		let writeIndex = dstStart
		dst[writeIndex++] = f

		let ai = fi
		let b = f
		let bi = fi
		V2.copy(ab, UP)
		let c
		let ci

		for (;;) {
			let minAngle = PInfinity
			let bcNorm = NInfinity

			for (let i = srcStart; i < srcEnd; i++) {
				if (i === ai || i === bi) { continue }
				const p = src[i]

				V2.sub.to(bp, p, b)
				const angle = V2.angle2(bp, ab)
				if (gt(angle, minAngle)) { continue }

				const bpNorm = V2.normSquared(bp)
				if (eq(angle, minAngle) && lte(bpNorm, bcNorm)) { continue }

				minAngle = angle
				c = p
				ci = i
				V2.copy(bc, bp)
				bcNorm = bpNorm
			}

			if (V2.eq(c, f)) { break }
			dst[writeIndex++] = c

			ai = bi
			b = c
			bi = ci
			V2.copy(ab, bc)
		}

		const hullLength = writeIndex - dstStart
		return hullLength < 3 ? null : hullLength
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
