const { memoize } = require('@kmamal/util/function/memoize')
const { sortBy } = require('@kmamal/util/array/sort')

const getX = ([ x ]) => x
const getY = ([ , y ]) => y

const BREAKOFF = 4

const defineFor = memoize((Domain) => {
	const { add, sub, mul, div, sqrt, lt, lte, fromNumber } = Domain
	const TWO = fromNumber(2)
	const V2 = require('@kmamal/linear-algebra/vec2').defineFor(Domain)

	const __recurse = (buffers, sortedX, sortedY, start, end, best) => {
		const length = end - start

		if (length <= BREAKOFF) {
			let minNorm = mul(best, best)
			let minA
			let minB
			for (let i = start + 1; i < end; i++) {
				const a = sortedX[i]
				for (let j = 0; j < i; j++) {
					const b = sortedX[j]
					V2.sub.to(buffers.ab, b, a)
					const norm = V2.normSquared(buffers.ab)
					if (lt(norm, minNorm)) {
						minNorm = norm
						minA = a
						minB = b
					}
				}
			}
			return { a: minA, b: minB, dist: sqrt(minNorm) }
		}

		const mid = start + Math.floor(length / 2)

		const left = __recurse(buffers, sortedX, sortedY, start, mid, best)
		const right = __recurse(buffers, sortedX, sortedY, mid, end, left.dist)


		const result = lte(left.dist, right.dist) ? left : right
		const midX = div(add(sortedX[mid][0], sortedX[mid - 1][0]), TWO)

		const leftX = sub(midX, result.dist)
		const rightX = add(midX, result.dist)

		let leftEnd = 0
		let rightEnd = 0
		for (let i = 0; i < sortedY.length; i++) {
			const point = sortedY[i]
			const x = point[0]
			if (lt(x, leftX) || lt(rightX, x)) { continue }
			if (lt(x, midX)) {
				buffers.left[leftEnd++] = point
			} else {
				buffers.right[rightEnd++] = point
			}
		}

		let minJ = 0
		for (let i = 0; i < leftEnd; i++) {
			const a = buffers.left[i]
			for (let j = minJ; j < rightEnd; j++) {
				const b = buffers.right[j]
				V2.sub.to(buffers.ab, b, a)
				const dist = V2.norm(buffers.ab)
				if (lt(dist, result.dist)) {
					result.a = a
					result.b = b
					result.dist = dist
				} else {
					if (lt(a[1], b[1])) { break }
					minJ = j
				}
			}
		}

		return result
	}

	const closestPair = (points) => {
		const { length } = points
		if (length < 2) { return null }

		const halfLength = Math.floor(length / 2)
		const buffers = {
			ab: new Array(2),
			left: new Array(halfLength),
			right: new Array(halfLength),
		}

		const sortedX = sortBy(points, getX)
		const sortedY = sortBy(points, getY)

		return __recurse(buffers, sortedX, sortedY, 0, length, Infinity)
	}

	return { closestPair }
})

module.exports = { defineFor }
