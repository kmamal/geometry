const { test } = require('@kmamal/testing')
const N = require('@kmamal/numbers/js')
const D = require('./from-line').defineFor(N)

const floatEqual = (t, actual, expected, tollerance = 1e-5) => t.ok(
	expected - tollerance <= actual && actual <= expected + tollerance,
	{ actual, expected },
)

test("geometry.sdf.line2lineSquared", (t) => {
	floatEqual(t, D.line2lineSquared([ -1, -1 ], [ 1, 1 ], [ -1, 1 ], [ 1, -1 ]), 0)
	floatEqual(t, D.line2lineSquared([ -1, -1 ], [ 1, 1 ], [ -1, 0 ], [ 1, 0 ]), 0)
	floatEqual(t, D.line2lineSquared([ -1, -1 ], [ 1, 1 ], [ 0, -1 ], [ 0, 1 ]), 0)

	floatEqual(t, D.line2lineSquared([ -1, -1 ], [ 1, 1 ], [ -1, -1 ], [ 1, 1 ]), 0)
	floatEqual(t, D.line2lineSquared([ -1, -1 ], [ 1, 1 ], [ 1, 1 ], [ -1, -1 ]), 0)

	floatEqual(t, D.line2lineSquared([ -1, -1 ], [ 1, 1 ], [ -1, -2 ], [ 1, 0 ]), 0.5)
	floatEqual(t, D.line2lineSquared([ 1, 1 ], [ -1, -1 ], [ -1, -2 ], [ 1, 0 ]), 0.5)

	floatEqual(t, D.line2lineSquared([ -1, -1 ], [ 1, 1 ], [ -1, 0 ], [ 1, 2 ]), 0.5)
	floatEqual(t, D.line2lineSquared([ 1, 1 ], [ -1, -1 ], [ -1, 0 ], [ 1, 2 ]), 0.5)
})

test("geometry.sdf.line2line", (t) => {
	floatEqual(t, D.line2line([ -1, -1 ], [ 1, 1 ], [ -1, 1 ], [ 1, -1 ]), 0)
	floatEqual(t, D.line2line([ -1, -1 ], [ 1, 1 ], [ -1, 0 ], [ 1, 0 ]), 0)
	floatEqual(t, D.line2line([ -1, -1 ], [ 1, 1 ], [ 0, -1 ], [ 0, 1 ]), 0)

	floatEqual(t, D.line2line([ -1, -1 ], [ 1, 1 ], [ -1, -1 ], [ 1, 1 ]), 0)
	floatEqual(t, D.line2line([ -1, -1 ], [ 1, 1 ], [ 1, 1 ], [ -1, -1 ]), 0)

	floatEqual(t, D.line2line([ -1, -1 ], [ 1, 1 ], [ -1, -2 ], [ 1, 0 ]), Math.sqrt(2) / 2)
	floatEqual(t, D.line2line([ 1, 1 ], [ -1, -1 ], [ -1, -2 ], [ 1, 0 ]), Math.sqrt(2) / 2)

	floatEqual(t, D.line2line([ -1, -1 ], [ 1, 1 ], [ -1, 0 ], [ 1, 2 ]), Math.sqrt(2) / 2)
	floatEqual(t, D.line2line([ 1, 1 ], [ -1, -1 ], [ -1, 0 ], [ 1, 2 ]), Math.sqrt(2) / 2)
})

test("geometry.sdf.line2segment", (t) => {
	floatEqual(t, D.line2segment([ -1, -1 ], [ 1, 1 ], [ -1, 1 ], [ 1, -1 ]), -Math.sqrt(2))
	floatEqual(t, D.line2segment([ -1, -1 ], [ 1, 1 ], [ -1, 0 ], [ 1, 0 ]), -Math.sqrt(2) / 2)
	floatEqual(t, D.line2segment([ -1, -1 ], [ 1, 1 ], [ 0, -1 ], [ 0, 1 ]), -Math.sqrt(2) / 2)

	floatEqual(t, D.line2segment([ -1, -1 ], [ 1, 1 ], [ -1, -1 ], [ 1, 1 ]), 0)
	floatEqual(t, D.line2segment([ -1, -1 ], [ 1, 1 ], [ 1, 1 ], [ -1, -1 ]), 0)

	floatEqual(t, D.line2segment([ -1, -1 ], [ 1, 1 ], [ -1, -2 ], [ 1, 0 ]), Math.sqrt(2) / 2)
	floatEqual(t, D.line2segment([ 1, 1 ], [ -1, -1 ], [ -1, -2 ], [ 1, 0 ]), Math.sqrt(2) / 2)
	floatEqual(t, D.line2segment([ -1, -1 ], [ 1, 1 ], [ 1, 0 ], [ -1, -2 ]), Math.sqrt(2) / 2)
	floatEqual(t, D.line2segment([ 1, 1 ], [ -1, -1 ], [ 1, 0 ], [ -1, -2 ]), Math.sqrt(2) / 2)

	floatEqual(t, D.line2segment([ -1, -1 ], [ 1, 1 ], [ -1, 0 ], [ 1, 2 ]), Math.sqrt(2) / 2)
	floatEqual(t, D.line2segment([ 1, 1 ], [ -1, -1 ], [ -1, 0 ], [ 1, 2 ]), Math.sqrt(2) / 2)
	floatEqual(t, D.line2segment([ -1, -1 ], [ 1, 1 ], [ 1, 2 ], [ -1, 0 ]), Math.sqrt(2) / 2)
	floatEqual(t, D.line2segment([ 1, 1 ], [ -1, -1 ], [ 1, 2 ], [ -1, 0 ]), Math.sqrt(2) / 2)

	floatEqual(t, D.line2segment([ -1, -1 ], [ 1, 1 ], [ 2, 0 ], [ 1, 0 ]), Math.sqrt(2) / 2)
	floatEqual(t, D.line2segment([ 1, 1 ], [ -1, -1 ], [ 2, 0 ], [ 1, 0 ]), Math.sqrt(2) / 2)
	floatEqual(t, D.line2segment([ -1, -1 ], [ 1, 1 ], [ 1, 0 ], [ 2, 0 ]), Math.sqrt(2) / 2)
	floatEqual(t, D.line2segment([ 1, 1 ], [ -1, -1 ], [ 1, 0 ], [ 2, 0 ]), Math.sqrt(2) / 2)

	floatEqual(t, D.line2segment([ -1, -1 ], [ 1, 1 ], [ 0, 2 ], [ 0, 1 ]), Math.sqrt(2) / 2)
	floatEqual(t, D.line2segment([ 1, 1 ], [ -1, -1 ], [ 0, 2 ], [ 0, 1 ]), Math.sqrt(2) / 2)
	floatEqual(t, D.line2segment([ -1, -1 ], [ 1, 1 ], [ 0, 1 ], [ 0, 2 ]), Math.sqrt(2) / 2)
	floatEqual(t, D.line2segment([ 1, 1 ], [ -1, -1 ], [ 0, 1 ], [ 0, 2 ]), Math.sqrt(2) / 2)
})

test("geometry.sdf.line2box", (t) => {
	floatEqual(t, D.line2box([ -1, -1 ], [ 1, 1 ], 2, 4), -Math.sqrt(2) * 1.5)
	floatEqual(t, D.line2box([ 1, 1 ], [ -1, -1 ], 2, 4), -Math.sqrt(2) * 1.5)

	floatEqual(t, D.line2box([ -1, -1 ], [ 1, -1 ], 2, 4), -1)
	floatEqual(t, D.line2box([ 1, -1 ], [ -1, -1 ], 2, 4), -1)
	floatEqual(t, D.line2box([ -1, 0 ], [ 1, 0 ], 2, 4), -2)
	floatEqual(t, D.line2box([ 1, 0 ], [ -1, 0 ], 2, 4), -2)
	floatEqual(t, D.line2box([ -1, 1 ], [ 1, 1 ], 2, 4), -1)
	floatEqual(t, D.line2box([ 1, 1 ], [ -1, 1 ], 2, 4), -1)

	floatEqual(t, D.line2box([ -1, -1 ], [ -1, 1 ], 2, 4), 0)
	floatEqual(t, D.line2box([ -1, 1 ], [ -1, -1 ], 2, 4), 0)
	floatEqual(t, D.line2box([ 0, -1 ], [ 0, 1 ], 2, 4), -1)
	floatEqual(t, D.line2box([ 0, 1 ], [ 0, -1 ], 2, 4), -1)
	floatEqual(t, D.line2box([ 1, -1 ], [ 1, 1 ], 2, 4), 0)
	floatEqual(t, D.line2box([ 1, 1 ], [ 1, -1 ], 2, 4), 0)
})

/* eslint-disable comma-spacing */
const convex = [ 0,-2, -2,0, 0,2, 2,0 ]
/* eslint-enable comma-spacing */

test("geometry.sdf.line2convex", (t) => {
	floatEqual(t, D.line2convex([ -1, -1 ], [ 1, 1 ], convex), -Math.sqrt(2))
	floatEqual(t, D.line2convex([ 1, 1 ], [ -1, -1 ], convex), -Math.sqrt(2))

	floatEqual(t, D.line2convex([ -1, -1 ], [ 1, -1 ], convex), -1)
	floatEqual(t, D.line2convex([ 1, -1 ], [ -1, -1 ], convex), -1)
	floatEqual(t, D.line2convex([ -1, 0 ], [ 1, 0 ], convex), -2)
	floatEqual(t, D.line2convex([ 1, 0 ], [ -1, 0 ], convex), -2)
	floatEqual(t, D.line2convex([ -1, 1 ], [ 1, 1 ], convex), -1)
	floatEqual(t, D.line2convex([ 1, 1 ], [ -1, 1 ], convex), -1)

	floatEqual(t, D.line2convex([ -1, -1 ], [ -1, 1 ], convex), -1)
	floatEqual(t, D.line2convex([ -1, 1 ], [ -1, -1 ], convex), -1)
	floatEqual(t, D.line2convex([ 0, -1 ], [ 0, 1 ], convex), -2)
	floatEqual(t, D.line2convex([ 0, 1 ], [ 0, -1 ], convex), -2)
	floatEqual(t, D.line2convex([ 1, -1 ], [ 1, 1 ], convex), -1)
	floatEqual(t, D.line2convex([ 1, 1 ], [ 1, -1 ], convex), -1)
})

/* eslint-disable comma-spacing */
const concave = [ 1,-1, 1,1, 0,1, 0,0, -1,0, -1,-1 ]
/* eslint-enable comma-spacing */

test("geometry.sdf.line2polygon", (t) => {
	floatEqual(t, D.line2polygon([ -1, -1 ], [ 1, 1 ], concave), -Math.sqrt(2) / 2)
	floatEqual(t, D.line2polygon([ 1, 1 ], [ -1, -1 ], concave), -Math.sqrt(2) / 2)

	floatEqual(t, D.line2polygon([ -1, -1 ], [ 1, -1 ], concave), 0)
	floatEqual(t, D.line2polygon([ 1, -1 ], [ -1, -1 ], concave), 0)
	floatEqual(t, D.line2polygon([ -1, 0 ], [ 1, 0 ], concave), -1)
	floatEqual(t, D.line2polygon([ 1, 0 ], [ -1, 0 ], concave), -1)
	floatEqual(t, D.line2polygon([ -1, 1 ], [ 1, 1 ], concave), 0)
	floatEqual(t, D.line2polygon([ 1, 1 ], [ -1, 1 ], concave), 0)

	floatEqual(t, D.line2polygon([ -1, -1 ], [ -1, 1 ], concave), 0)
	floatEqual(t, D.line2polygon([ -1, 1 ], [ -1, -1 ], concave), 0)
	floatEqual(t, D.line2polygon([ 0, -1 ], [ 0, 1 ], concave), -1)
	floatEqual(t, D.line2polygon([ 0, 1 ], [ 0, -1 ], concave), -1)
	floatEqual(t, D.line2polygon([ 1, -1 ], [ 1, 1 ], concave), 0)
	floatEqual(t, D.line2polygon([ 1, 1 ], [ 1, -1 ], concave), 0)
})
