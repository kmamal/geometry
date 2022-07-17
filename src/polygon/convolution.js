const { memoize } = require('@kmamal/util/function/memoize')
const { point } = require('./point')

const defineFor = memoize((Domain) => {
	const { sub, eq, gt, lt, lte, fromNumber } = Domain
	const ZERO = fromNumber(0)
	const ONE = fromNumber(1)
	const MINUS_ONE = fromNumber(-1)
	const V2 = require('../../../linear-algebra/vec2').defineFor(Domain)

	const convolution = (a, b) => {
		const { length: aLength } = a
		const { length: bLength } = b

		if (aLength === 0) { return [] }
		if (bLength === 0) { return [] }
		if (aLength === 2) {
			const res = new Array(bLength)
			for (let i = 0; i < bLength; i += 2) {
				res[i + 0] = b[i + 0] + a[0]
				res[i + 1] = b[i + 1] + a[1]
			}
			return res
		}
		if (bLength === 2) {
			const res = new Array(aLength)
			for (let i = 0; i < aLength; i += 2) {
				res[i + 0] = a[i + 0] + b[0]
				res[i + 1] = a[i + 1] + b[1]
			}
			return res
		}

		let lastWasPositive

		let aStart = aLength - 1
		const a1 = point(a, aLength - 2)
		const a2 = new Array(2)
		lastWasPositive = true
		for (let i = 0; i <= aLength; i += 2) {
			aStart = i % aLength
			point.to(a2, a, aStart)

			const isPositive = gt(a2[1], a1[1])
				|| (eq(a2[1], a1[1]) && lt(a2[0], a1[0]))
			if (isPositive && !lastWasPositive) { break }

			V2.copy(a1, a2)
			lastWasPositive = isPositive
		}

		let bStart = bLength - 1
		const b1 = point(b, bLength - 2)
		const b2 = new Array(2)
		lastWasPositive = true
		for (let i = 0; i <= bLength; i += 2) {
			bStart = i % bLength
			point.to(b2, b, bStart)

			const isPositive = gt(b2[1], b1[1])
				|| (eq(b2[1], b1[1]) && lt(b2[0], b1[0]))
			if (isPositive && !lastWasPositive) { break }

			V2.copy(b1, b2)
			lastWasPositive = isPositive
		}

		const res = new Array(aLength + bLength)
		let writeIndex = 0

		const lastPoint = V2.add(a1, b1)
		res[writeIndex++] = lastPoint[0]
		res[writeIndex++] = lastPoint[1]
		const lastEdge = [ NaN, NaN ]

		let ai = aStart
		let bi = bStart
		const aEdge = V2.sub(a2, a1)
		const bEdge = V2.sub(b2, b1)
		let aFullTurn = false
		let bFullTurn = false
		let lastUsed = ONE

		while (!aFullTurn || !bFullTurn) {
			let cross = V2.cross(aEdge, bEdge)
			if (eq(cross, ZERO)) { cross = sub(cross, lastUsed) }

			if (lte(cross, ZERO)) {
				lastUsed = MINUS_ONE
				if (eq(V2.cross(aEdge, lastEdge), ZERO)) {
					writeIndex -= 2
				}

				V2.add.$$$(lastPoint, aEdge)
				res[writeIndex++] = lastPoint[0]
				res[writeIndex++] = lastPoint[1]
				V2.copy(lastEdge, aEdge)

				ai = (ai + 2) % aLength
				aFullTurn ||= ai === aStart
				V2.copy(a1, a2)
				point.to(a2, a, ai)
				V2.sub.to(aEdge, a2, a1)
			} else {
				lastUsed = ONE
				if (eq(V2.cross(bEdge, lastEdge), ZERO)) {
					writeIndex -= 2
				}

				V2.add.$$$(lastPoint, bEdge)
				res[writeIndex++] = lastPoint[0]
				res[writeIndex++] = lastPoint[1]
				V2.copy(lastEdge, bEdge)

				bi = (bi + 2) % bLength
				bFullTurn ||= bi === bStart
				V2.copy(b1, b2)
				point.to(b2, b, bi)
				V2.sub.to(bEdge, b2, b1)
			}
		}

		res.length = writeIndex - 2
		return res
	}

	return { convolution }
})

module.exports = { defineFor }
