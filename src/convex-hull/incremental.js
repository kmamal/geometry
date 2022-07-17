const { memoize } = require('@kmamal/util/function/memoize')
const { __copyInplace } = require('@kmamal/util/array/copy')
const { clone } = require('@kmamal/util/array/clone')

const defineFor = memoize((Domain) => {
	const { eq, gt, lt, gte, lte, fromNumber } = Domain
	const ZERO = fromNumber(0)
	const V2 = require('../../../linear-algebra/vec2').defineFor(Domain)

	const __incrementConvexHull = (hull, hullStart, hullEnd, point) => {
		let start = null
		let end = null
		let lastCross = ZERO

		let a = hull[hullEnd - 1]
		const ab = new Array(2)
		const ap = new Array(2)

		let readIndex = hullStart
		while (readIndex !== hullEnd) {
			const b = hull[readIndex++]
			V2.sub.to(ab, b, a)
			V2.sub.to(ap, point, a)
			const cross = V2.cross(ab, ap)

			if (gt(cross, ZERO)) {
				if (lte(lastCross, ZERO)) { start = readIndex - 1 }
			} else if (lt(cross, ZERO)) {
				if (gte(lastCross, ZERO)) { end = readIndex - 2 }
			}

			a = b
			lastCross = cross
		}

		const length = hullEnd - hullStart
		if (start === null) { return length }

		start -= hullStart
		start = (start + length) % length
		start += hullStart

		end -= hullStart
		end = (end + length) % length
		end += hullStart

		let numRemaining
		if (start <= end) {
			__copyInplace(hull, start + 1, end, hullEnd)
			hull[start] = point
			numRemaining = length - (end - start)
		} else {
			__copyInplace(hull, hullStart, end, start)
			numRemaining = start - end
			hull[hullStart + numRemaining] = point
		}

		return numRemaining + 1
	}

	const incrementConvexHull$$$ = (hull, point) => {
		const n = __incrementConvexHull(hull, 0, hull.length, point)
		hull.length = n
		return hull
	}

	const incrementConvexHull = (hull, point) => {
		const res = clone(hull)
		return incrementConvexHull$$$(res, point)
	}

	incrementConvexHull.$$$ = incrementConvexHull$$$

	const __incrementalConvexHull = (dst, dstStart, src, srcStart, srcEnd) => {
		let readIndex = srcStart
		let writeIndex = dstStart
		const a = src[readIndex++]
		const b = src[readIndex++]
		const ab = V2.sub(b, a)
		let c
		const bc = new Array(2)
		let cross
		while (readIndex !== srcEnd) {
			c = src[readIndex++]
			V2.sub.to(bc, c, b)
			cross = V2.cross(ab, bc)
			if (!eq(cross, ZERO)) { break }
		}

		if (eq(cross, ZERO)) { return null }

		if (gt(cross, ZERO)) {
			dst[writeIndex++] = b
			dst[writeIndex++] = a
		} else {
			dst[writeIndex++] = a
			dst[writeIndex++] = b
		}
		dst[writeIndex++] = c

		while (readIndex !== srcEnd) {
			const point = src[readIndex++]
			writeIndex = __incrementConvexHull(dst, dstStart, writeIndex, point)
		}

		return writeIndex
	}

	const incrementalConvexHull$$$ = (points) => {
		const { length } = points
		if (length < 3) { return null }
		const n = __incrementalConvexHull(points, 0, points, 0, points.length)
		if (n === null) { return null }
		points.length = n
		return points
	}

	const incrementalConvexHull = (points) => {
		const { length } = points
		if (length < 3) { return null }
		const res = []
		const n = __incrementalConvexHull(res, 0, points, 0, points.length)
		if (n === null) { return null }
		res.length = n
		return res
	}

	incrementalConvexHull.$$$ = incrementalConvexHull$$$

	return {
		__incrementConvexHull,
		incrementConvexHull,
		incrementalConvexHull,
	}
})

module.exports = { defineFor }
