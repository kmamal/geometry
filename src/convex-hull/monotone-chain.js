const { memoize } = require('@kmamal/util/function/memoize')
const { map } = require('@kmamal/util/array/map')
const { sortBy } = require('@kmamal/util/array/sort')

const defineFor = memoize((Domain) => {
	const { lt, fromNumber } = Domain
	const ZERO = fromNumber(0)
	const V2 = require('@kmamal/linear-algebra/vec2').defineFor(Domain)
	const V2_ZERO = V2.fromNumbers(0, 0)

	const monotoneChainConvexHull = (_points) => {
		const { length } = _points
		if (length < 3) { return null }

		const points = Array.from(_points)
		sortBy.$$$(points, ([ x ]) => x)

		let a = points[0]
		let readIndex = 1
		let b
		let ab
		do {
			b = points[readIndex++]
			ab = V2.sub(b, a)
		} while (V2.eq(ab, V2_ZERO))

		const hull = [
			{ point: a, incoming: null },
			{ point: b, incoming: ab },
		]

		while (readIndex < length) {
			const c = points[readIndex++]
			let bc = V2.sub(c, b)

			for (;;) {
				const isConvex = lt(V2.cross(ab, bc), ZERO)
				if (isConvex) { break }

				hull.pop()
				const { point, incoming } = hull[hull.length - 1]
				b = point
				bc = V2.sub(c, b)

				if (!incoming) { break }
				ab = incoming
			}

			hull.push({ point: c, incoming: bc })

			b = c
			ab = bc
		}

		const last = hull.length - 1
		hull[last].incoming = null
		a = hull[last].point
		readIndex -= 2
		do {
			b = points[readIndex--]
			ab = V2.sub(b, a)
		} while (V2.eq(ab, V2_ZERO))
		hull.push({ point: b, incoming: ab })

		while (readIndex >= 0) {
			const c = points[readIndex--]
			let bc = V2.sub(c, b)

			for (;;) {
				const isConvex = lt(V2.cross(ab, bc), ZERO)
				if (isConvex) { break }

				hull.pop()
				const { point, incoming } = hull[hull.length - 1]
				b = point
				bc = V2.sub(c, b)

				if (!incoming) { break }
				ab = incoming
			}

			hull.push({ point: c, incoming: bc })

			b = c
			ab = bc
		}

		hull.pop()
		if (hull.length < 3) { return null }

		map.$$$(hull, ({ point }) => point)
		return hull
	}

	return { monotoneChainConvexHull }
})

module.exports = { defineFor }
