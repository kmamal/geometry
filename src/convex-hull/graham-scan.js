const { memoize } = require('@kmamal/util/function/memoize')
const { __min } = require('@kmamal/util/array/min')
const { __map } = require('@kmamal/util/array/map')
const { __sort } = require('@kmamal/util/array/sort')
const { clone } = require('@kmamal/util/array/clone')

const ab = new Array(2)
const bc = new Array(2)

const getPoint = (x) => x.point


const defineFor = memoize((Domain) => {
	const { sub, div, eq, lt, isNaN, fromNumber } = Domain
	const ZERO = fromNumber(0)
	const V2 = require('@kmamal/linear-algebra/vec2').defineFor(Domain)
	const ORIGIN = V2.fromNumbers(0, 0)

	const fnCmpPoints = (a, b) => {
		const dx = a[0] - b[0]
		if (dx !== 0) { return dx }
		const dy = a[1] - b[1]
		return dy
	}

	const fnCmpEntries = (v, u) => {
		if (isNaN(v.slope)) { return -1 }
		if (isNaN(u.slope)) { return 1 }
		return eq(v.slope, u.slope)
			? sub(v.dist, u.dist)
			: sub(u.slope, v.slope)
	}


	const __grahamScanConvexHull = (arr, start, end) => {
		const ai = __min(arr, start, end, fnCmpPoints).index
		const a = arr[ai]

		__map(arr, start, arr, start, end, (b) => {
			V2.sub.to(ab, b, a)
			return {
				point: b,
				slope: div(ab[1], ab[0]),
				dist: V2.normSquared(ab),
				incoming: null,
			}
		})
		__sort(arr, start, end, fnCmpEntries)

		const second = start + 1
		let readIndex = second
		let writeIndex = second
		let entry
		let b
		for (;;) {
			entry = arr[readIndex++]
			b = entry.point
			V2.sub.to(ab, b, a)
			if (V2.neq(ab, ORIGIN)) { break }
			if (readIndex === end) {
				__map(arr, start, arr, start, writeIndex, getPoint)
				return null
			}
		}

		entry = arr[writeIndex++]
		entry.point = b
		entry.incoming = V2.clone(ab)

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

			entry = arr[writeIndex++]
			entry.point = c
			entry.incoming = V2.clone(bc)

			b = c
			V2.copy(ab, bc)
		}

		__map(arr, start, arr, start, writeIndex, getPoint)
		const hullLength = writeIndex - start
		return hullLength < 3 ? null : hullLength
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
