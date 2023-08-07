const { test } = require('@kmamal/testing')
const N = require('@kmamal/numbers/js')
const D = require('./from-segment').defineFor(N)

const floatEqual = (t, actual, expected, tollerance = 1e-5) => t.ok(
	expected - tollerance <= actual && actual <= expected + tollerance,
	{ actual, expected },
)

test("geometry.sdf.segment2segment", (t) => {
	floatEqual(t, D.segment2segment([ -1, 0 ], [ 1, 0 ], [ -1, -2 ], [ 1, -2 ]), 2)
	floatEqual(t, D.segment2segment([ -1, 0 ], [ 1, 0 ], [ -1, -1 ], [ 1, -1 ]), 1)
	floatEqual(t, D.segment2segment([ -1, 0 ], [ 1, 0 ], [ -1, 0 ], [ 1, 0 ]), 0)
	floatEqual(t, D.segment2segment([ -1, 0 ], [ 1, 0 ], [ -1, 2 ], [ 1, 2 ]), 2)

	floatEqual(t, D.segment2segment([ -1, 0 ], [ 1, 0 ], [ -3, 0 ], [ -2, 0 ]), 1)
	floatEqual(t, D.segment2segment([ -1, 0 ], [ 1, 0 ], [ -2, 0 ], [ -1, 0 ]), 0)
	floatEqual(t, D.segment2segment([ -1, 0 ], [ 1, 0 ], [ -1, 0 ], [ 0, 0 ]), 0)
	floatEqual(t, D.segment2segment([ -1, 0 ], [ 1, 0 ], [ 0, 0 ], [ 1, 0 ]), 0)
	floatEqual(t, D.segment2segment([ -1, 0 ], [ 1, 0 ], [ 1, 0 ], [ 2, 0 ]), 0)
	floatEqual(t, D.segment2segment([ -1, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ]), 1)

	floatEqual(t, D.segment2segment([ -1, 0 ], [ 1, 0 ], [ -2, -2 ], [ -2, -1 ]), Math.sqrt(2))
	floatEqual(t, D.segment2segment([ -1, 0 ], [ 1, 0 ], [ -1, -2 ], [ -1, -1 ]), 1)
	floatEqual(t, D.segment2segment([ -1, 0 ], [ 1, 0 ], [ 0, -2 ], [ 0, -1 ]), 1)
	floatEqual(t, D.segment2segment([ -1, 0 ], [ 1, 0 ], [ 1, -2 ], [ 1, -1 ]), 1)
	floatEqual(t, D.segment2segment([ -1, 0 ], [ 1, 0 ], [ 2, -2 ], [ 2, -1 ]), Math.sqrt(2))

	floatEqual(t, D.segment2segment([ -1, 0 ], [ 1, 0 ], [ -2, 2 ], [ -2, 1 ]), Math.sqrt(2))
	floatEqual(t, D.segment2segment([ -1, 0 ], [ 1, 0 ], [ -1, 2 ], [ -1, 1 ]), 1)
	floatEqual(t, D.segment2segment([ -1, 0 ], [ 1, 0 ], [ 0, 2 ], [ 0, 1 ]), 1)
	floatEqual(t, D.segment2segment([ -1, 0 ], [ 1, 0 ], [ 1, 2 ], [ 1, 1 ]), 1)
	floatEqual(t, D.segment2segment([ -1, 0 ], [ 1, 0 ], [ 2, 2 ], [ 2, 1 ]), Math.sqrt(2))

	floatEqual(t, D.segment2segment([ -1, 0 ], [ 1, 0 ], [ -1, -1 ], [ -1, 1 ]), 0)
	floatEqual(t, D.segment2segment([ -1, 0 ], [ 1, 0 ], [ 0, -1 ], [ 0, 1 ]), -1)
	floatEqual(t, D.segment2segment([ -1, 0 ], [ 1, 0 ], [ 1, -1 ], [ 1, 1 ]), 0)

	floatEqual(t, D.segment2segment([ -2, 0 ], [ 1, 0 ], [ 0, -1 ], [ 0, 1 ]), -1)
	floatEqual(t, D.segment2segment([ -1, 0 ], [ 2, 0 ], [ 0, -1 ], [ 0, 1 ]), -1)
	floatEqual(t, D.segment2segment([ -2, 0 ], [ 2, 0 ], [ 0, -1 ], [ 0, 1 ]), -1)
	floatEqual(t, D.segment2segment([ -2, 0 ], [ 2, 0 ], [ 0, -2 ], [ 0, 1 ]), -1)
	floatEqual(t, D.segment2segment([ -2, 0 ], [ 2, 0 ], [ 0, -1 ], [ 0, 2 ]), -1)
	floatEqual(t, D.segment2segment([ -2, 0 ], [ 2, 0 ], [ 0, -2 ], [ 0, 2 ]), -2)

	floatEqual(t, D.segment2segment([ -1, 0 ], [ 1, 0 ], [ -1, -1 ], [ 1, 1 ]), -Math.sqrt(2) / 2)
	floatEqual(t, D.segment2segment([ -1, 0 ], [ 1, 0 ], [ -1, 1 ], [ 1, -1 ]), -Math.sqrt(2) / 2)
})

test("geometry.sdf.segment2box", (t) => {
	floatEqual(t, D.segment2box([ -1, -3 ], [ 1, -3 ], 2, 4), 1)
	floatEqual(t, D.segment2box([ -1, -2 ], [ 1, -2 ], 2, 4), 0)
	floatEqual(t, D.segment2box([ -1, -1 ], [ 1, -1 ], 2, 4), -1)
	floatEqual(t, D.segment2box([ -1, 0 ], [ 1, 0 ], 2, 4), -2)
	floatEqual(t, D.segment2box([ -1, 1 ], [ 1, 1 ], 2, 4), -1)
	floatEqual(t, D.segment2box([ -1, 2 ], [ 1, 2 ], 2, 4), 0)
	floatEqual(t, D.segment2box([ -1, 3 ], [ 1, 3 ], 2, 4), 1)

	floatEqual(t, D.segment2box([ -1, -2 ], [ 1, 2 ], 2, 4), -4 / Math.sqrt(5))
	floatEqual(t, D.segment2box([ -1, 2 ], [ 1, -2 ], 2, 4), -4 / Math.sqrt(5))
})

/* eslint-disable comma-spacing */
const convex = [ 0,-2, -2,0, 0,2, 2,0 ]
/* eslint-enable comma-spacing */

test("geometry.sdf.segment2convex", (t) => {
	floatEqual(t, D.segment2convex([ -2, -2 ], [ 0, 0 ], convex), -Math.sqrt(2))
	floatEqual(t, D.segment2convex([ 2, -2 ], [ 0, 0 ], convex), -Math.sqrt(2))
	floatEqual(t, D.segment2convex([ 2, 2 ], [ 0, 0 ], convex), -Math.sqrt(2))
	floatEqual(t, D.segment2convex([ -2, 2 ], [ 0, 0 ], convex), -Math.sqrt(2))

	floatEqual(t, D.segment2convex([ -2, -2 ], [ -1, -1 ], convex), 0)
	floatEqual(t, D.segment2convex([ 2, -2 ], [ 1, -1 ], convex), 0)
	floatEqual(t, D.segment2convex([ 2, 2 ], [ 1, 1 ], convex), 0)
	floatEqual(t, D.segment2convex([ -2, 2 ], [ -1, 1 ], convex), 0)

	floatEqual(t, D.segment2convex([ -2, 0 ], [ 2, 0 ], convex), -2)
	floatEqual(t, D.segment2convex([ 2, 0 ], [ -2, 0 ], convex), -2)
	floatEqual(t, D.segment2convex([ 0, -2 ], [ 0, 2 ], convex), -2)
	floatEqual(t, D.segment2convex([ 0, 2 ], [ 0, -2 ], convex), -2)

	floatEqual(t, D.segment2convex([ -2, 0 ], [ 0, 2 ], convex), 0)
	floatEqual(t, D.segment2convex([ 0, 2 ], [ 2, 0 ], convex), 0)
	floatEqual(t, D.segment2convex([ 2, 0 ], [ 0, -2 ], convex), 0)
	floatEqual(t, D.segment2convex([ 0, -2 ], [ -2, 0 ], convex), 0)

	floatEqual(t, D.segment2convex([ -3, 1 ], [ -1, 3 ], convex), Math.sqrt(2))
	floatEqual(t, D.segment2convex([ 1, 3 ], [ 3, 1 ], convex), Math.sqrt(2))
	floatEqual(t, D.segment2convex([ 3, -1 ], [ 1, -3 ], convex), Math.sqrt(2))
	floatEqual(t, D.segment2convex([ -1, -3 ], [ -3, -1 ], convex), Math.sqrt(2))
})

/* eslint-disable comma-spacing */
const concave = [ 0,-2, -2,0, 0,2, 0,0, 2,0 ]
/* eslint-enable comma-spacing */

test("geometry.sdf.segment2polygon", (t) => {
	floatEqual(t, D.segment2polygon([ -2, -2 ], [ 0, 0 ], concave), -Math.sqrt(2))
	floatEqual(t, D.segment2polygon([ 2, -2 ], [ 0, 0 ], concave), -Math.sqrt(2))
	floatEqual(t, D.segment2polygon([ 2, 2 ], [ 0, 0 ], concave), 0)
	floatEqual(t, D.segment2polygon([ -2, 2 ], [ 0, 0 ], concave), -Math.sqrt(2))

	floatEqual(t, D.segment2polygon([ -2, -2 ], [ -1, -1 ], concave), 0)
	floatEqual(t, D.segment2polygon([ 2, -2 ], [ 1, -1 ], concave), 0)
	floatEqual(t, D.segment2polygon([ 2, 2 ], [ 1, 1 ], concave), 1)
	floatEqual(t, D.segment2polygon([ -2, 2 ], [ -1, 1 ], concave), 0)

	floatEqual(t, D.segment2polygon([ -2, 0 ], [ 2, 0 ], concave), -2)
	floatEqual(t, D.segment2polygon([ 2, 0 ], [ -2, 0 ], concave), -2)
	floatEqual(t, D.segment2polygon([ 0, -2 ], [ 0, 2 ], concave), -2)
	floatEqual(t, D.segment2polygon([ 0, 2 ], [ 0, -2 ], concave), -2)

	floatEqual(t, D.segment2polygon([ -2, 0 ], [ 0, 2 ], concave), 0)
	floatEqual(t, D.segment2polygon([ 0, 2 ], [ 2, 0 ], concave), 0)
	floatEqual(t, D.segment2polygon([ 2, 0 ], [ 0, -2 ], concave), 0)
	floatEqual(t, D.segment2polygon([ 0, -2 ], [ -2, 0 ], concave), 0)

	floatEqual(t, D.segment2polygon([ -3, 1 ], [ -1, 3 ], concave), Math.sqrt(2))
	floatEqual(t, D.segment2polygon([ 1, 3 ], [ 3, 1 ], concave), Math.sqrt(2))
	floatEqual(t, D.segment2polygon([ 3, -1 ], [ 1, -3 ], concave), Math.sqrt(2))
	floatEqual(t, D.segment2polygon([ -1, -3 ], [ -3, -1 ], concave), Math.sqrt(2))
})
