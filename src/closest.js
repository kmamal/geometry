const { memoize } = require('@kmamal/util/function/memoize')

const defineFor = memoize((Domain) => {
	const V2 = require('@kmamal/linear-algebra/vec2').defineFor(Domain)
	const Distance = require('./distance').defineFor(Domain)

	const point2circle = (point, r) => V2.scale(point, r)

	const point2line = (point, a, b) => {
		const ap = V2.sub(point, a)
		const line = V2.sub(b, a)
		const h = V2.dot(ap, line) / V2.normSquared(line)
		V2.add.to(ap, a, V2.scale.$$$(line, h))
		return ap
	}

	const point2segment = (point, a, b) => {
		const ap = V2.sub(point, a)
		const line = V2.sub(b, a)
		const h = V2.dot(ap, line) / V2.normSquared(line)
		const hClamped = Math.max(0, Math.min(1, h))
		return V2.scale(line, hClamped)
	}

	const point2box = ([ x, y ], w, h) => {
		const halfW = w / 2
		const halfH = h / 2
		const sx = Math.sign(x)
		const sy = Math.sign(y)
		const dx = sx * x - halfW
		const dy = sy * y - halfH
		const xInside = dx < 0
		const yInside = dy < 0

		let cx = x
		let cy = y
		if (xInside && yInside) {
			if (dx < dy) {
				cx = halfW
			} else {
				cy = halfH
			}
		} else {
			if (!xInside) { cx = halfW }
			if (!yInside) { cy = halfH }
		}

		return [ sx * cx, sy * cy ]
	}

	const point2polygon = (point, polygon) => {
		let closest = null
		let distance = Infinity

		const last = polygon.length - 2
		const a = new Array(2)
		const b = new Array(2)
		for (let i = 0, ii = last; i < polygon.length; ii = i, i += 2) {
			a[0] = polygon[ii + 0]
			a[1] = polygon[ii + 1]
			b[0] = polygon[i + 0]
			b[1] = polygon[i + 1]

			const newClosest = point2segment(point, a, b)
			const newDistance = Distance.point2point(point, newClosest)

			if (newDistance < distance) {
				distance = newDistance
				closest = newClosest
			}
		}

		return closest
	}

	// circles

	const line2line = (a1, b1, a2, b2) => {
		const line1 = V2.sub(b1, a1)
		const line2 = V2.sub(b2, a2)
		const d = V2.cross(line1, line2)
		const c1 = V2.cross(a1, b1)
		const c2 = V2.cross(a2, b2)
		const areParallel = d === 0

		if (areParallel) {
		// const p1 = point2line(a1, a2, b2)
		// const p2 = point2line(b1, a2, b2)
		// return [
		// 	[ a1, b1 ],
		// 	[ p1, p2 ],
		// ]
			return null
		}

		return [
			(c1 * line2[0] - c2 * line1[0]) / d,
			(c1 * line2[1] - c2 * line1[1]) / d,
		]
	}

	// segments


	const segmentIntersectsSegment = (a1, b1, a2, b2) => {
		const ab1 = V2.sub(b1, a1)
		const ab2 = V2.sub(b2, a2)
		const a = V2.sub(a2, a1)
		const det = V2.cross(ab1, ab2)
		const t1 = V2.cross(ab2, a) / det
		const t2 = V2.cross(ab1, a) / det
		const intersect = true
		&& 0 <= t1 && t1 <= 1
		&& 0 <= t2 && t2 <= 1
	}

	return {
		point2circle,
		point2line,
		point2segment,
		point2box,
		point2polygon,
	}
})

module.exports = { defineFor }
