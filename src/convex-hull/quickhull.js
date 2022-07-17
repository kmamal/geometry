const { memoize } = require('@kmamal/util/function/memoize')
const { clone } = require('@kmamal/util/array/clone')
const { swap } = require('@kmamal/util/array/swap')

const defineFor = memoize((Domain) => {
	const { lt, gt, PInfinity, NInfinity, fromNumber } = Domain
	const ZERO = fromNumber(0)
	const V2 = require('../../../linear-algebra/vec2').defineFor(Domain)
	const SDF = require('../sdf').defineFor(Domain)

	const __quickhullConvexHull = (arr, _start, _end) => {
		const stack = []
		let writeIndex

		{
			const _second = _start + 1
			const _third = _start + 2
			const _fourth = _start + 3
			const _fifth = _start + 4

			const first = arr[_start]
			let left = first
			let right = first
			let leftX = first[0]
			let rightX = first[0]
			let leftIndex = _start
			let rightIndex = _start
			for (let i = _second; i !== _end; i++) {
				const point = arr[i]
				const x = point[0]
				if (lt(x, leftX)) {
					left = point
					leftX = x
					leftIndex = i
				} else if (gt(x, rightX)) {
					right = point
					rightX = x
					rightIndex = i
				}
			}

			if (leftIndex < rightIndex) {
				swap.$$$(arr, leftIndex, _start)
				swap.$$$(arr, rightIndex, _second)
			} else {
				swap.$$$(arr, rightIndex, _start)
				swap.$$$(arr, leftIndex, _second)
			}

			writeIndex = _third

			let pAbove = null
			let pBelow = null
			let pAboveD = NInfinity
			let pBelowD = PInfinity
			let pAboveIndex = null
			let pBelowIndex = null
			for (let i = _third; i !== _end; i++) {
				const point = arr[i]

				const d = SDF.point2halfplane(point, left, right)
				if (gt(d, ZERO)) {
					if (gt(d, pAboveD)) {
						pAbove = point
						pAboveD = d
						pAboveIndex = writeIndex
					}

					swap.$$$(arr, i, writeIndex++)
				} else if (lt(d, ZERO)) {
					if (lt(d, pBelowD)) {
						pBelow = point
						pBelowD = d
						if (pBelowIndex !== null) {
							swap.$$$(arr, i, pBelowIndex)
						} else {
							pBelowIndex = writeIndex
							swap.$$$(arr, i, writeIndex++)
						}
					}
				}
			}

			let startAbove
			if (pAbove && pBelow) {
				startAbove = _fifth
				if (pAboveIndex < pBelowIndex) {
					swap.$$$(arr, pAboveIndex, _third)
					swap.$$$(arr, pBelowIndex, _fourth)
				} else {
					swap.$$$(arr, pBelowIndex, _third)
					swap.$$$(arr, pAboveIndex, _fourth)
				}
			} else if (pAbove) {
				startAbove = _fourth
				swap.$$$(arr, pAboveIndex, _third)
			} else if (pBelow) {
				startAbove = _fourth
				swap.$$$(arr, pBelowIndex, _third)
			} else {
				startAbove = _third
			}

			stack.push({ a: right, b: left, p: pBelow, start: writeIndex, end: _end })
			stack.push({ a: left, b: right, p: pAbove, start: startAbove, end: writeIndex })
		}

		writeIndex = _start

		while (stack.length > 0) {
			const item = stack.pop()

			const { a, b, p, start, end } = item
			const second = start + 1
			const third = start + 2

			if (p === null) {
				arr[writeIndex++] = a
				continue
			} else if (end - start === 0) {
				arr[writeIndex++] = a
				arr[writeIndex++] = p
				continue
			}

			let separator = start

			let pLeft = null
			let pRight = null
			let pLeftD = NInfinity
			let pRightD = NInfinity
			let pLeftIndex = null
			let pRightIndex = null
			for (let i = start; i !== end; i++) {
				const point = arr[i]

				const d1 = SDF.point2halfplane(point, a, p)
				const d2 = SDF.point2halfplane(point, p, b)
				if (gt(d1, ZERO)) {
					if (gt(d1, pLeftD)) {
						pLeft = point
						pLeftD = d1
						pLeftIndex = separator
					}

					swap.$$$(arr, i, separator++)
				} else if (gt(d2, ZERO)) {
					if (gt(d2, pRightD)) {
						pRight = point
						pRightD = d2
						if (pRightIndex !== null) {
							swap.$$$(arr, i, pRightIndex)
						} else {
							pRightIndex = separator
							swap.$$$(arr, i, separator++)
						}
					}
				}
			}

			let startLeft
			if (pLeft && pRight) {
				startLeft = third
				if (pLeftIndex < pRightIndex) {
					swap.$$$(arr, pLeftIndex, start)
					swap.$$$(arr, pRightIndex, second)
				} else {
					swap.$$$(arr, pRightIndex, start)
					swap.$$$(arr, pLeftIndex, second)
				}
			} else if (pLeft) {
				startLeft = second
				swap.$$$(arr, pLeftIndex, start)
			} else if (pRight) {
				startLeft = second
				swap.$$$(arr, pRightIndex, start)
			} else {
				startLeft = start
			}

			stack.push({ a: p, b, p: pRight, start: separator, end })
			stack.push({ a, b: p, p: pLeft, start: startLeft, end: separator })
		}

		return writeIndex - _start || null
	}

	const quickhullConvexHull$$$ = (points) => {
		const { length } = points
		if (length < 3) { return null }
		const n = __quickhullConvexHull(points, 0, points.length)
		if (n === null) { return null }
		points.length = n
		return points
	}

	const quickhullConvexHull = (points) => {
		const { length } = points
		if (length < 3) { return null }
		const res = clone(points)
		const n = __quickhullConvexHull(res, 0, points.length)
		if (n === null) { return null }
		res.length = n
		return res
	}

	quickhullConvexHull.$$$ = quickhullConvexHull$$$

	return {
		__quickhullConvexHull,
		quickhullConvexHull,
	}
})

module.exports = { defineFor }
