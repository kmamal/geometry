const { memoize } = require('@kmamal/util/function/memoize')

const defineFor = memoize((Domain) => {
	const V2 = require('@kmamal/linear-algebra/vec2').defineFor(Domain)
	const Convex = require('./from-convex').defineFor(Domain)

	const box2box = (w1, h1, c, w2, h2) => {
		const hw1 = w1 / 2
		const hh1 = h1 / 2
		const hw2 = w2 / 2
		const hh2 = h2 / 2
		const dx = Math.abs(c[0]) - (hw2 + hw1)
		const dy = Math.abs(c[1]) - (hh2 + hh1)
		if (dx < 0 || dy < 0) { return Math.max(dx, dy) }
		return V2.norm([ dx, dy ])
	}

	const _makePolygon = (w, h) => {
		const hw = w / 2
		const hh = h / 2
		/* eslint-disable array-element-newline */
		return [
			-hw, -hh,
			-hw, hh,
			hw, hh,
			hw, -hh,
		]
		/* eslint-enable array-element-newline */
	}

	const box2convex = (w, h, polygon) => {
		const box = _makePolygon(w, h)
		return Convex.convex2convex(box, polygon)
	}

	const box2polygon = (w, h, polygon) => {
		const box = _makePolygon(w, h)
		return Convex.convex2polygon(box, polygon)
	}

	return {
		box2box,
		box2convex,
		box2polygon,
	}
})

module.exports = { defineFor }
