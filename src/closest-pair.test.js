const { test } = require('@kmamal/testing')
const N = require('../../domains/number')
const { closestPair } = require('./closest-pair').defineFor(N)
const V2 = require('../../linear-algebra/vec2').defineFor(N)
const { map } = require('@kmamal/util/array/map')

const M = 100

test("geometry.closestPair", (t) => {
	const points = new Array(M)
	map.$$$(points, () => [ Math.random(), Math.random() ])

	let a
	let b
	let dist = Infinity
	for (let i = 1; i < M; i++) {
		const c = points[i]
		for (let j = 0; j < i; j++) {
			const d = points[j]
			const cd = V2.sub(d, c)
			const norm = V2.norm(cd)
			if (norm < dist) {
				a = c
				b = d
				dist = norm
			}
		}
	}

	const result = closestPair(points)

	if (V2.eq(a, result.b)) {
		const tmp = a
		a = b
		b = tmp
	}

	t.equal(result, { a, b, dist })
})
