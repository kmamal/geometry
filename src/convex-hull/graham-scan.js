const { memoize } = require('@kmamal/util/function/memoize')
const { __min } = require('@kmamal/util/array/min')
const { __map } = require('@kmamal/util/array/map')
const { __sort } = require('@kmamal/util/array/sort')
const { clone } = require('@kmamal/util/array/clone')

const defineFor = memoize((Domain) => {
	const { neg, sub, div, eq, lt, isNaN, fromNumber, NInfinity } = Domain
	const ZERO = fromNumber(0)
	const V2 = require('@kmamal/linear-algebra/vec2').defineFor(Domain)
	const ORIGIN = V2.fromNumbers(0, 0)

	const _getSlope = (ax, ay, bx, by) => {
		const slope = div(sub(by, ay), sub(bx, ax))
		return isNaN(slope) ? slope : neg(slope)
	}

	const __grahamScanConvexHull = (arr, start, end) => {
		const a = arr[__min(arr, start, end, ([ x ]) => x).index]

		const [ ax, ay ] = a
		__map(arr, start, arr, start, end, (point) => ({
			point,
			value: _getSlope(ax, ay, point[0], point[1]),
		}))
		__sort(arr, start, end, (v, u) => {
			if (isNaN(v.value)) { return -1 }
			if (isNaN(u.value)) { return 1 }
			if (eq(v.value, u.value)) { return -1 }
			return sub(v.value, u.value)
		})

		const second = start + 1
		let readIndex = second
		let writeIndex = second
		let obj
		let b
		let ab = new Array(2)
		do {
			obj = arr[readIndex++]
			b = obj.point
			V2.sub.to(ab, b, a)
		} while (V2.eq(ab, ORIGIN))

		arr[start].incoming = null

		obj = arr[writeIndex++]
		obj.point = b
		obj.incoming = V2.clone(ab)

		const bc = new Array(2)
		while (readIndex !== end) {
			const c = arr[readIndex++].point
			V2.sub.to(bc, c, b)

			for (;;) {
				const isConvex = lt(V2.cross(ab, bc), ZERO)
				if (isConvex) { break }

				writeIndex -= 1
				const { point, incoming } = arr[writeIndex - 1]
				b = point
				V2.sub.to(bc, c, b)

				if (!incoming) { break }
				V2.copy(ab, incoming)
			}

			obj = arr[writeIndex++]
			obj.point = c
			obj.incoming = V2.clone(bc)

			b = c
			V2.copy(ab, bc)
		}

		const hullLength = writeIndex - start
		if (hullLength < 3) { return null }

		__map(arr, start, arr, start, writeIndex, ({ point }) => point)
		return hullLength
	}

	const grahamScanConvexHull$$$ = (points) => {
		const { length } = points
		if (length < 3) { return null }
		const n = __grahamScanConvexHull(points, 0, points.length)
		if (n === null) { return null }
		points.length = n
		return points
	}

	const grahamScanConvexHull = (points) => {
		const res = clone(points)
		return grahamScanConvexHull$$$(res)
	}

	grahamScanConvexHull.$$$ = grahamScanConvexHull$$$

	return {
		__grahamScanConvexHull,
		grahamScanConvexHull,
	}
})

module.exports = { defineFor }
