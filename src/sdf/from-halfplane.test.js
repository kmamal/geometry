const { test } = require('@kmamal/testing')
const N = require('../../../domains/number')
const D = require('./from-halfplane').defineFor(N)

const floatEqual = (t, actual, expected, tollerance = 1e-5) => t.ok(
	expected - tollerance <= actual && actual <= expected + tollerance,
	{ actual, expected },
)

test("geometry.sdf.halfplane2halfplane", (t) => {
	floatEqual(t, D.halfplane2halfplane([ -1, -1 ], [ 1, 1 ], [ -1, 1 ], [ 1, -1 ]), 0)
	floatEqual(t, D.halfplane2halfplane([ -1, -1 ], [ 1, 1 ], [ -1, 0 ], [ 1, 0 ]), 0)
	floatEqual(t, D.halfplane2halfplane([ -1, -1 ], [ 1, 1 ], [ 0, -1 ], [ 0, 1 ]), 0)

	floatEqual(t, D.halfplane2halfplane([ -1, -1 ], [ 1, 1 ], [ -1, -1 ], [ 1, 1 ]), -Infinity)
	floatEqual(t, D.halfplane2halfplane([ -1, -1 ], [ 1, 1 ], [ 1, 1 ], [ -1, -1 ]), 0)

	floatEqual(t, D.halfplane2halfplane([ -1, -1 ], [ 1, 1 ], [ -1, -2 ], [ 1, 0 ]), -Infinity)
	floatEqual(t, D.halfplane2halfplane([ -1, -1 ], [ 1, 1 ], [ 1, 0 ], [ -1, -2 ]), -Math.sqrt(2) / 2)

	floatEqual(t, D.halfplane2halfplane([ -1, -1 ], [ 1, 1 ], [ -1, 0 ], [ 1, 2 ]), -Infinity)
	floatEqual(t, D.halfplane2halfplane([ -1, -1 ], [ 1, 1 ], [ 1, 2 ], [ -1, 0 ]), Math.sqrt(2) / 2)
})

test("geometry.sdf.halfplane2line", (t) => {
	floatEqual(t, D.halfplane2line([ -1, -1 ], [ 1, 1 ], [ -1, 1 ], [ 1, -1 ]), 0)
	floatEqual(t, D.halfplane2line([ -1, -1 ], [ 1, 1 ], [ -1, 0 ], [ 1, 0 ]), 0)
	floatEqual(t, D.halfplane2line([ -1, -1 ], [ 1, 1 ], [ 0, -1 ], [ 0, 1 ]), 0)

	floatEqual(t, D.halfplane2line([ -1, -1 ], [ 1, 1 ], [ -1, -1 ], [ 1, 1 ]), 0)
	floatEqual(t, D.halfplane2line([ -1, -1 ], [ 1, 1 ], [ 1, 1 ], [ -1, -1 ]), 0)

	floatEqual(t, D.halfplane2line([ -1, -1 ], [ 1, 1 ], [ -1, -2 ], [ 1, 0 ]), -Math.sqrt(2) / 2)
	floatEqual(t, D.halfplane2line([ 1, 1 ], [ -1, -1 ], [ -1, -2 ], [ 1, 0 ]), Math.sqrt(2) / 2)

	floatEqual(t, D.halfplane2line([ -1, -1 ], [ 1, 1 ], [ -1, 0 ], [ 1, 2 ]), Math.sqrt(2) / 2)
	floatEqual(t, D.halfplane2line([ 1, 1 ], [ -1, -1 ], [ -1, 0 ], [ 1, 2 ]), -Math.sqrt(2) / 2)
})

test("geometry.sdf.halfplane2segment", (t) => {
	floatEqual(t, D.halfplane2segment([ -1, -1 ], [ 1, 1 ], [ -1, 1 ], [ 1, -1 ]), -Math.sqrt(2))
	floatEqual(t, D.halfplane2segment([ -1, -1 ], [ 1, 1 ], [ -1, 0 ], [ 1, 0 ]), -Math.sqrt(2) / 2)
	floatEqual(t, D.halfplane2segment([ -1, -1 ], [ 1, 1 ], [ 0, -1 ], [ 0, 1 ]), -Math.sqrt(2) / 2)

	floatEqual(t, D.halfplane2segment([ -1, -1 ], [ 1, 1 ], [ -1, -1 ], [ 1, 1 ]), 0)
	floatEqual(t, D.halfplane2segment([ -1, -1 ], [ 1, 1 ], [ 1, 1 ], [ -1, -1 ]), 0)

	floatEqual(t, D.halfplane2segment([ -1, -1 ], [ 1, 1 ], [ -1, -2 ], [ 1, 0 ]), -Math.sqrt(2) / 2)
	floatEqual(t, D.halfplane2segment([ 1, 1 ], [ -1, -1 ], [ -1, -2 ], [ 1, 0 ]), Math.sqrt(2) / 2)
	floatEqual(t, D.halfplane2segment([ -1, -1 ], [ 1, 1 ], [ 1, 0 ], [ -1, -2 ]), -Math.sqrt(2) / 2)
	floatEqual(t, D.halfplane2segment([ 1, 1 ], [ -1, -1 ], [ 1, 0 ], [ -1, -2 ]), Math.sqrt(2) / 2)

	floatEqual(t, D.halfplane2segment([ -1, -1 ], [ 1, 1 ], [ -1, 0 ], [ 1, 2 ]), Math.sqrt(2) / 2)
	floatEqual(t, D.halfplane2segment([ 1, 1 ], [ -1, -1 ], [ -1, 0 ], [ 1, 2 ]), -Math.sqrt(2) / 2)
	floatEqual(t, D.halfplane2segment([ -1, -1 ], [ 1, 1 ], [ 1, 2 ], [ -1, 0 ]), Math.sqrt(2) / 2)
	floatEqual(t, D.halfplane2segment([ 1, 1 ], [ -1, -1 ], [ 1, 2 ], [ -1, 0 ]), -Math.sqrt(2) / 2)

	floatEqual(t, D.halfplane2segment([ -1, -1 ], [ 1, 1 ], [ 2, 0 ], [ 1, 0 ]), -Math.sqrt(2))
	floatEqual(t, D.halfplane2segment([ 1, 1 ], [ -1, -1 ], [ 2, 0 ], [ 1, 0 ]), Math.sqrt(2) / 2)
	floatEqual(t, D.halfplane2segment([ -1, -1 ], [ 1, 1 ], [ 1, 0 ], [ 2, 0 ]), -Math.sqrt(2))
	floatEqual(t, D.halfplane2segment([ 1, 1 ], [ -1, -1 ], [ 1, 0 ], [ 2, 0 ]), Math.sqrt(2) / 2)

	floatEqual(t, D.halfplane2segment([ -1, -1 ], [ 1, 1 ], [ 0, 2 ], [ 0, 1 ]), Math.sqrt(2) / 2)
	floatEqual(t, D.halfplane2segment([ 1, 1 ], [ -1, -1 ], [ 0, 2 ], [ 0, 1 ]), -Math.sqrt(2))
	floatEqual(t, D.halfplane2segment([ -1, -1 ], [ 1, 1 ], [ 0, 1 ], [ 0, 2 ]), Math.sqrt(2) / 2)
	floatEqual(t, D.halfplane2segment([ 1, 1 ], [ -1, -1 ], [ 0, 1 ], [ 0, 2 ]), -Math.sqrt(2))
})

test("geometry.sdf.halfplane2box", (t) => {
	floatEqual(t, D.halfplane2box([ -1, -1 ], [ 1, 1 ], 2, 4), -Math.sqrt(2) * 1.5)
	floatEqual(t, D.halfplane2box([ 1, 1 ], [ -1, -1 ], 2, 4), -Math.sqrt(2) * 1.5)

	floatEqual(t, D.halfplane2box([ -1, -1 ], [ 1, -1 ], 2, 4), -1)
	floatEqual(t, D.halfplane2box([ 1, -1 ], [ -1, -1 ], 2, 4), -3)
	floatEqual(t, D.halfplane2box([ -1, 0 ], [ 1, 0 ], 2, 4), -2)
	floatEqual(t, D.halfplane2box([ 1, 0 ], [ -1, 0 ], 2, 4), -2)
	floatEqual(t, D.halfplane2box([ -1, 1 ], [ 1, 1 ], 2, 4), -3)
	floatEqual(t, D.halfplane2box([ 1, 1 ], [ -1, 1 ], 2, 4), -1)

	floatEqual(t, D.halfplane2box([ -1, -1 ], [ -1, 1 ], 2, 4), -2)
	floatEqual(t, D.halfplane2box([ -1, 1 ], [ -1, -1 ], 2, 4), 0)
	floatEqual(t, D.halfplane2box([ 0, -1 ], [ 0, 1 ], 2, 4), -1)
	floatEqual(t, D.halfplane2box([ 0, 1 ], [ 0, -1 ], 2, 4), -1)
	floatEqual(t, D.halfplane2box([ 1, -1 ], [ 1, 1 ], 2, 4), 0)
	floatEqual(t, D.halfplane2box([ 1, 1 ], [ 1, -1 ], 2, 4), -2)
})

/* eslint-disable comma-spacing */
const convex = [ 0,-2, -2,0, 0,2, 2,0 ]
/* eslint-enable comma-spacing */

test("geometry.sdf.halfplane2convex", (t) => {
	floatEqual(t, D.halfplane2convex([ -1, -1 ], [ 1, 1 ], convex), -Math.sqrt(2))
	floatEqual(t, D.halfplane2convex([ 1, 1 ], [ -1, -1 ], convex), -Math.sqrt(2))

	floatEqual(t, D.halfplane2convex([ -1, -1 ], [ 1, -1 ], convex), -1)
	floatEqual(t, D.halfplane2convex([ 1, -1 ], [ -1, -1 ], convex), -3)
	floatEqual(t, D.halfplane2convex([ -1, 0 ], [ 1, 0 ], convex), -2)
	floatEqual(t, D.halfplane2convex([ 1, 0 ], [ -1, 0 ], convex), -2)
	floatEqual(t, D.halfplane2convex([ -1, 1 ], [ 1, 1 ], convex), -3)
	floatEqual(t, D.halfplane2convex([ 1, 1 ], [ -1, 1 ], convex), -1)

	floatEqual(t, D.halfplane2convex([ -1, -1 ], [ -1, 1 ], convex), -3)
	floatEqual(t, D.halfplane2convex([ -1, 1 ], [ -1, -1 ], convex), -1)
	floatEqual(t, D.halfplane2convex([ 0, -1 ], [ 0, 1 ], convex), -2)
	floatEqual(t, D.halfplane2convex([ 0, 1 ], [ 0, -1 ], convex), -2)
	floatEqual(t, D.halfplane2convex([ 1, -1 ], [ 1, 1 ], convex), -1)
	floatEqual(t, D.halfplane2convex([ 1, 1 ], [ 1, -1 ], convex), -3)
})

/* eslint-disable comma-spacing */
const concave = [ 1,-1, 1,1, 0,1, 0,0, -1,0, -1,-1 ]
/* eslint-enable comma-spacing */

test("geometry.sdf.halfplane2polygon", (t) => {
	floatEqual(t, D.halfplane2polygon([ -1, -1 ], [ 1, 1 ], concave), -Math.sqrt(2))
	floatEqual(t, D.halfplane2polygon([ 1, 1 ], [ -1, -1 ], concave), -Math.sqrt(2) / 2)

	floatEqual(t, D.halfplane2polygon([ -1, -1 ], [ 1, -1 ], concave), 0)
	floatEqual(t, D.halfplane2polygon([ 1, -1 ], [ -1, -1 ], concave), -2)
	floatEqual(t, D.halfplane2polygon([ -1, 0 ], [ 1, 0 ], concave), -1)
	floatEqual(t, D.halfplane2polygon([ 1, 0 ], [ -1, 0 ], concave), -1)
	floatEqual(t, D.halfplane2polygon([ -1, 1 ], [ 1, 1 ], concave), -2)
	floatEqual(t, D.halfplane2polygon([ 1, 1 ], [ -1, 1 ], concave), 0)

	floatEqual(t, D.halfplane2polygon([ -1, -1 ], [ -1, 1 ], concave), -2)
	floatEqual(t, D.halfplane2polygon([ -1, 1 ], [ -1, -1 ], concave), 0)
	floatEqual(t, D.halfplane2polygon([ 0, -1 ], [ 0, 1 ], concave), -1)
	floatEqual(t, D.halfplane2polygon([ 0, 1 ], [ 0, -1 ], concave), -1)
	floatEqual(t, D.halfplane2polygon([ 1, -1 ], [ 1, 1 ], concave), 0)
	floatEqual(t, D.halfplane2polygon([ 1, 1 ], [ 1, -1 ], concave), -2)
})
