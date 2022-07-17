const { test } = require('@kmamal/testing')
const N = require('../../../domains/number')
const D = require('./from-box').defineFor(N)

const floatEqual = (t, actual, expected, tollerance = 1e-5) => t.ok(
	expected - tollerance <= actual && actual <= expected + tollerance,
	{ actual, expected },
)

test("geometry.sdf.box2box", (t) => {
	floatEqual(t, D.box2box(2, 2, [ 0, 0 ], 2, 2), -2)
	floatEqual(t, D.box2box(2, 2, [ 1, 0 ], 2, 2), -1)
	floatEqual(t, D.box2box(2, 2, [ 0, 1 ], 2, 2), -1)
	floatEqual(t, D.box2box(2, 2, [ 1, 1 ], 2, 2), -1)
	floatEqual(t, D.box2box(2, 2, [ 2, 2 ], 2, 2), 0)
	floatEqual(t, D.box2box(2, 2, [ 3, 3 ], 2, 2), Math.sqrt(2))
	floatEqual(t, D.box2box(2, 2, [ -3, -3 ], 2, 2), Math.sqrt(2))
})

const translate = (p, x, y) => {
	const { length } = p
	const res = new Array(length)
	for (let i = 0; i < length; i++) {
		res[i] = p[i] + (i % 2 ? y : x)
	}
	return res
}

/* eslint-disable comma-spacing */
const convex = [ 0,-1, -1,0, 0,1, 1,0 ]
/* eslint-enable comma-spacing */

test("geometry.sdf.box2convex", (t) => {
	floatEqual(t, D.box2convex(2, 2, convex), -2)
	floatEqual(t, D.box2convex(2, 2, translate(convex, 0, 2)), 0)
	floatEqual(t, D.box2convex(2, 2, translate(convex, 0, 2)), 0)
	floatEqual(t, D.box2convex(2, 2, translate(convex, 2, 2)), Math.sqrt(2) / 2)
})

/* eslint-disable comma-spacing */
const concave = [ 0,-1, -1,0, 0,1, 0,0, 1,0 ]
/* eslint-enable comma-spacing */

test("geometry.sdf.box2polygon", (t) => {
	floatEqual(t, D.box2polygon(2, 2, concave), -Math.sqrt(2))
	floatEqual(t, D.box2polygon(2, 2, translate(concave, 0, 2)), 0)
	floatEqual(t, D.box2polygon(2, 2, translate(concave, 0, 2)), 0)
	floatEqual(t, D.box2polygon(2, 2, translate(concave, 2, 2)), Math.sqrt(2) / 2)
})
