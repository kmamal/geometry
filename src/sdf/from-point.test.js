const { test } = require('@kmamal/testing')
const N = require('../../../domains/number')
const D = require('./from-point').defineFor(N)

const floatEqual = (t, actual, expected, tollerance = 1e-5) => t.ok(
	expected - tollerance <= actual && actual <= expected + tollerance,
	{ actual, expected },
)

test("geometry.sdf.point2pointSquared", (t) => {
	floatEqual(t, D.point2pointSquared([ -1, 1 ], [ -1, 1 ]), 0)
	floatEqual(t, D.point2pointSquared([ 0, 1 ], [ 0, 1 ]), 0)
	floatEqual(t, D.point2pointSquared([ 1, 1 ], [ 1, 1 ]), 0)

	floatEqual(t, D.point2pointSquared([ -1, 0 ], [ -1, 0 ]), 0)
	floatEqual(t, D.point2pointSquared([ 0, 0 ], [ 0, 0 ]), 0)
	floatEqual(t, D.point2pointSquared([ 1, 0 ], [ 1, 0 ]), 0)

	floatEqual(t, D.point2pointSquared([ -1, -1 ], [ -1, -1 ]), 0)
	floatEqual(t, D.point2pointSquared([ 0, -1 ], [ 0, -1 ]), 0)
	floatEqual(t, D.point2pointSquared([ 1, -1 ], [ 1, -1 ]), 0)

	floatEqual(t, D.point2pointSquared([ -1, 1 ], [ 0, 0 ]), 2)
	floatEqual(t, D.point2pointSquared([ 0, 1 ], [ 0, 0 ]), 1)
	floatEqual(t, D.point2pointSquared([ 1, 1 ], [ 0, 0 ]), 2)

	floatEqual(t, D.point2pointSquared([ -1, 0 ], [ 0, 0 ]), 1)
	floatEqual(t, D.point2pointSquared([ 0, 0 ], [ 0, 0 ]), 0)
	floatEqual(t, D.point2pointSquared([ 1, 0 ], [ 0, 0 ]), 1)

	floatEqual(t, D.point2pointSquared([ -1, -1 ], [ 0, 0 ]), 2)
	floatEqual(t, D.point2pointSquared([ 0, -1 ], [ 0, 0 ]), 1)
	floatEqual(t, D.point2pointSquared([ 1, -1 ], [ 0, 0 ]), 2)
})

test("geometry.sdf.point2point", (t) => {
	floatEqual(t, D.point2point([ -1, 1 ], [ -1, 1 ]), 0)
	floatEqual(t, D.point2point([ 0, 1 ], [ 0, 1 ]), 0)
	floatEqual(t, D.point2point([ 1, 1 ], [ 1, 1 ]), 0)

	floatEqual(t, D.point2point([ -1, 0 ], [ -1, 0 ]), 0)
	floatEqual(t, D.point2point([ 0, 0 ], [ 0, 0 ]), 0)
	floatEqual(t, D.point2point([ 1, 0 ], [ 1, 0 ]), 0)

	floatEqual(t, D.point2point([ -1, -1 ], [ -1, -1 ]), 0)
	floatEqual(t, D.point2point([ 0, -1 ], [ 0, -1 ]), 0)
	floatEqual(t, D.point2point([ 1, -1 ], [ 1, -1 ]), 0)

	floatEqual(t, D.point2point([ -1, 1 ], [ 0, 0 ]), Math.sqrt(2))
	floatEqual(t, D.point2point([ 0, 1 ], [ 0, 0 ]), 1)
	floatEqual(t, D.point2point([ 1, 1 ], [ 0, 0 ]), Math.sqrt(2))

	floatEqual(t, D.point2point([ -1, 0 ], [ 0, 0 ]), 1)
	floatEqual(t, D.point2point([ 0, 0 ], [ 0, 0 ]), 0)
	floatEqual(t, D.point2point([ 1, 0 ], [ 0, 0 ]), 1)

	floatEqual(t, D.point2point([ -1, -1 ], [ 0, 0 ]), Math.sqrt(2))
	floatEqual(t, D.point2point([ 0, -1 ], [ 0, 0 ]), 1)
	floatEqual(t, D.point2point([ 1, -1 ], [ 0, 0 ]), Math.sqrt(2))
})

test("geometry.sdf.point2circle", (t) => {
	floatEqual(t, D.point2circle([ -1, 1 ], 1), Math.sqrt(2) - 1)
	floatEqual(t, D.point2circle([ 0, 1 ], 1), 0)
	floatEqual(t, D.point2circle([ 1, 1 ], 1), Math.sqrt(2) - 1)

	floatEqual(t, D.point2circle([ -1, 0 ], 1), 0)
	floatEqual(t, D.point2circle([ 0, 0 ], 1), -1)
	floatEqual(t, D.point2circle([ 1, 0 ], 1), 0)

	floatEqual(t, D.point2circle([ -1, -1 ], 1), Math.sqrt(2) - 1)
	floatEqual(t, D.point2circle([ 0, -1 ], 1), 0)
	floatEqual(t, D.point2circle([ 1, -1 ], 1), Math.sqrt(2) - 1)
})

test("geometry.sdf.point2halfplane", (t) => {
	floatEqual(t, D.point2halfplane([ -1, 1 ], [ -1, -1 ], [ 1, 1 ]), Math.sqrt(2))
	floatEqual(t, D.point2halfplane([ -1, 1 ], [ 1, 1 ], [ -1, -1 ]), -Math.sqrt(2))
	floatEqual(t, D.point2halfplane([ 0, 1 ], [ -1, -1 ], [ 1, 1 ]), Math.sqrt(2) / 2)
	floatEqual(t, D.point2halfplane([ 0, 1 ], [ 1, 1 ], [ -1, -1 ]), -Math.sqrt(2) / 2)
	floatEqual(t, D.point2halfplane([ 1, 1 ], [ -1, -1 ], [ 1, 1 ]), 0)
	floatEqual(t, D.point2halfplane([ 1, 1 ], [ 1, 1 ], [ -1, -1 ]), 0)

	floatEqual(t, D.point2halfplane([ -1, 0 ], [ -1, -1 ], [ 1, 1 ]), Math.sqrt(2) / 2)
	floatEqual(t, D.point2halfplane([ -1, 0 ], [ 1, 1 ], [ -1, -1 ]), -Math.sqrt(2) / 2)
	floatEqual(t, D.point2halfplane([ 0, 0 ], [ -1, -1 ], [ 1, 1 ]), 0)
	floatEqual(t, D.point2halfplane([ 0, 0 ], [ 1, 1 ], [ -1, -1 ]), 0)
	floatEqual(t, D.point2halfplane([ 1, 0 ], [ -1, -1 ], [ 1, 1 ]), -Math.sqrt(2) / 2)
	floatEqual(t, D.point2halfplane([ 1, 0 ], [ 1, 1 ], [ -1, -1 ]), Math.sqrt(2) / 2)

	floatEqual(t, D.point2halfplane([ -1, -1 ], [ -1, -1 ], [ 1, 1 ]), 0)
	floatEqual(t, D.point2halfplane([ -1, -1 ], [ 1, 1 ], [ -1, -1 ]), 0)
	floatEqual(t, D.point2halfplane([ 0, -1 ], [ -1, -1 ], [ 1, 1 ]), -Math.sqrt(2) / 2)
	floatEqual(t, D.point2halfplane([ 0, -1 ], [ 1, 1 ], [ -1, -1 ]), Math.sqrt(2) / 2)
	floatEqual(t, D.point2halfplane([ 1, -1 ], [ -1, -1 ], [ 1, 1 ]), -Math.sqrt(2))
	floatEqual(t, D.point2halfplane([ 1, -1 ], [ 1, 1 ], [ -1, -1 ]), Math.sqrt(2))
})

test("geometry.sdf.point2lineSquared", (t) => {
	floatEqual(t, D.point2lineSquared([ -1, 1 ], [ -1, -1 ], [ 1, 1 ]), 2)
	floatEqual(t, D.point2lineSquared([ 0, 1 ], [ -1, -1 ], [ 1, 1 ]), 0.5)
	floatEqual(t, D.point2lineSquared([ 1, 1 ], [ -1, -1 ], [ 1, 1 ]), 0)

	floatEqual(t, D.point2lineSquared([ -1, 0 ], [ -1, -1 ], [ 1, 1 ]), 0.5)
	floatEqual(t, D.point2lineSquared([ 0, 0 ], [ -1, -1 ], [ 1, 1 ]), 0)
	floatEqual(t, D.point2lineSquared([ 1, 0 ], [ -1, -1 ], [ 1, 1 ]), 0.5)

	floatEqual(t, D.point2lineSquared([ -1, -1 ], [ -1, -1 ], [ 1, 1 ]), 0)
	floatEqual(t, D.point2lineSquared([ 0, -1 ], [ -1, -1 ], [ 1, 1 ]), 0.5)
	floatEqual(t, D.point2lineSquared([ 1, -1 ], [ -1, -1 ], [ 1, 1 ]), 2)
})

test("geometry.sdf.point2line", (t) => {
	floatEqual(t, D.point2line([ -1, 1 ], [ -1, -1 ], [ 1, 1 ]), Math.sqrt(2))
	floatEqual(t, D.point2line([ 0, 1 ], [ -1, -1 ], [ 1, 1 ]), Math.sqrt(2) / 2)
	floatEqual(t, D.point2line([ 1, 1 ], [ -1, -1 ], [ 1, 1 ]), 0)

	floatEqual(t, D.point2line([ -1, 0 ], [ -1, -1 ], [ 1, 1 ]), Math.sqrt(2) / 2)
	floatEqual(t, D.point2line([ 0, 0 ], [ -1, -1 ], [ 1, 1 ]), 0)
	floatEqual(t, D.point2line([ 1, 0 ], [ -1, -1 ], [ 1, 1 ]), Math.sqrt(2) / 2)

	floatEqual(t, D.point2line([ -1, -1 ], [ -1, -1 ], [ 1, 1 ]), 0)
	floatEqual(t, D.point2line([ 0, -1 ], [ -1, -1 ], [ 1, 1 ]), Math.sqrt(2) / 2)
	floatEqual(t, D.point2line([ 1, -1 ], [ -1, -1 ], [ 1, 1 ]), Math.sqrt(2))
})

test("geometry.sdf.point2segmentSquared", (t) => {
	floatEqual(t, D.point2segmentSquared([ -2, 1 ], [ -1, 0 ], [ 1, 0 ]), 2)
	floatEqual(t, D.point2segmentSquared([ -1, 1 ], [ -1, 0 ], [ 1, 0 ]), 1)
	floatEqual(t, D.point2segmentSquared([ 0, 1 ], [ -1, 0 ], [ 1, 0 ]), 1)
	floatEqual(t, D.point2segmentSquared([ 1, 1 ], [ -1, 0 ], [ 1, 0 ]), 1)
	floatEqual(t, D.point2segmentSquared([ 2, 1 ], [ -1, 0 ], [ 1, 0 ]), 2)

	floatEqual(t, D.point2segmentSquared([ -2, 0 ], [ -1, 0 ], [ 1, 0 ]), 1)
	floatEqual(t, D.point2segmentSquared([ -1, 0 ], [ -1, 0 ], [ 1, 0 ]), 0)
	floatEqual(t, D.point2segmentSquared([ 0, 0 ], [ -1, 0 ], [ 1, 0 ]), 0)
	floatEqual(t, D.point2segmentSquared([ 1, 0 ], [ -1, 0 ], [ 1, 0 ]), 0)
	floatEqual(t, D.point2segmentSquared([ 2, 0 ], [ -1, 0 ], [ 1, 0 ]), 1)

	floatEqual(t, D.point2segmentSquared([ -2, -1 ], [ -1, 0 ], [ 1, 0 ]), 2)
	floatEqual(t, D.point2segmentSquared([ -1, -1 ], [ -1, 0 ], [ 1, 0 ]), 1)
	floatEqual(t, D.point2segmentSquared([ 0, -1 ], [ -1, 0 ], [ 1, 0 ]), 1)
	floatEqual(t, D.point2segmentSquared([ 1, -1 ], [ -1, 0 ], [ 1, 0 ]), 1)
	floatEqual(t, D.point2segmentSquared([ 2, -1 ], [ -1, 0 ], [ 1, 0 ]), 2)
})

test("geometry.sdf.point2segment", (t) => {
	floatEqual(t, D.point2segment([ -2, 1 ], [ -1, 0 ], [ 1, 0 ]), Math.sqrt(2))
	floatEqual(t, D.point2segment([ -1, 1 ], [ -1, 0 ], [ 1, 0 ]), 1)
	floatEqual(t, D.point2segment([ 0, 1 ], [ -1, 0 ], [ 1, 0 ]), 1)
	floatEqual(t, D.point2segment([ 1, 1 ], [ -1, 0 ], [ 1, 0 ]), 1)
	floatEqual(t, D.point2segment([ 2, 1 ], [ -1, 0 ], [ 1, 0 ]), Math.sqrt(2))

	floatEqual(t, D.point2segment([ -2, 0 ], [ -1, 0 ], [ 1, 0 ]), 1)
	floatEqual(t, D.point2segment([ -1, 0 ], [ -1, 0 ], [ 1, 0 ]), 0)
	floatEqual(t, D.point2segment([ 0, 0 ], [ -1, 0 ], [ 1, 0 ]), 0)
	floatEqual(t, D.point2segment([ 1, 0 ], [ -1, 0 ], [ 1, 0 ]), 0)
	floatEqual(t, D.point2segment([ 2, 0 ], [ -1, 0 ], [ 1, 0 ]), 1)

	floatEqual(t, D.point2segment([ -2, -1 ], [ -1, 0 ], [ 1, 0 ]), Math.sqrt(2))
	floatEqual(t, D.point2segment([ -1, -1 ], [ -1, 0 ], [ 1, 0 ]), 1)
	floatEqual(t, D.point2segment([ 0, -1 ], [ -1, 0 ], [ 1, 0 ]), 1)
	floatEqual(t, D.point2segment([ 1, -1 ], [ -1, 0 ], [ 1, 0 ]), 1)
	floatEqual(t, D.point2segment([ 2, -1 ], [ -1, 0 ], [ 1, 0 ]), Math.sqrt(2))
})

test("geometry.sdf.point2box", (t) => {
	floatEqual(t, D.point2box([ -2, 2 ], 2, 3), Math.sqrt(1.25))
	floatEqual(t, D.point2box([ -1, 2 ], 2, 3), 0.5)
	floatEqual(t, D.point2box([ 0, 2 ], 2, 3), 0.5)
	floatEqual(t, D.point2box([ 1, 2 ], 2, 3), 0.5)
	floatEqual(t, D.point2box([ 2, 2 ], 2, 3), Math.sqrt(1.25))

	floatEqual(t, D.point2box([ -2, 1 ], 2, 3), 1)
	floatEqual(t, D.point2box([ -1, 1 ], 2, 3), 0)
	floatEqual(t, D.point2box([ 0, 1 ], 2, 3), -0.5)
	floatEqual(t, D.point2box([ 1, 1 ], 2, 3), 0)
	floatEqual(t, D.point2box([ 2, 1 ], 2, 3), 1)

	floatEqual(t, D.point2box([ -2, 0 ], 2, 3), 1)
	floatEqual(t, D.point2box([ -1, 0 ], 2, 3), 0)
	floatEqual(t, D.point2box([ 0, 0 ], 2, 3), -1)
	floatEqual(t, D.point2box([ 1, 0 ], 2, 3), 0)
	floatEqual(t, D.point2box([ 2, 0 ], 2, 3), 1)

	floatEqual(t, D.point2box([ -2, -1 ], 2, 3), 1)
	floatEqual(t, D.point2box([ -1, -1 ], 2, 3), 0)
	floatEqual(t, D.point2box([ 0, -1 ], 2, 3), -0.5)
	floatEqual(t, D.point2box([ 1, -1 ], 2, 3), 0)
	floatEqual(t, D.point2box([ 2, -1 ], 2, 3), 1)

	floatEqual(t, D.point2box([ -2, -2 ], 2, 3), Math.sqrt(1.25))
	floatEqual(t, D.point2box([ -1, -2 ], 2, 3), 0.5)
	floatEqual(t, D.point2box([ 0, -2 ], 2, 3), 0.5)
	floatEqual(t, D.point2box([ 1, -2 ], 2, 3), 0.5)
	floatEqual(t, D.point2box([ 2, -2 ], 2, 3), Math.sqrt(1.25))
})

/* eslint-disable comma-spacing */
const convex = [ 0,-2, -2,0, 0,2, 2,0 ]
/* eslint-enable comma-spacing */

test("geometry.sdf.point2convex", (t) => {
	floatEqual(t, D.point2convex([ -2, 2 ], convex), Math.sqrt(2))
	floatEqual(t, D.point2convex([ -1, 2 ], convex), Math.sqrt(2) / 2)
	floatEqual(t, D.point2convex([ 0, 2 ], convex), 0)
	floatEqual(t, D.point2convex([ 1, 2 ], convex), Math.sqrt(2) / 2)
	floatEqual(t, D.point2convex([ 2, 2 ], convex), Math.sqrt(2))

	floatEqual(t, D.point2convex([ -2, 1 ], convex), Math.sqrt(2) / 2)
	floatEqual(t, D.point2convex([ -1, 1 ], convex), 0)
	floatEqual(t, D.point2convex([ 0, 1 ], convex), -Math.sqrt(2) / 2)
	floatEqual(t, D.point2convex([ 1, 1 ], convex), 0)
	floatEqual(t, D.point2convex([ 2, 1 ], convex), Math.sqrt(2) / 2)

	floatEqual(t, D.point2convex([ -2, 0 ], convex), 0)
	floatEqual(t, D.point2convex([ -1, 0 ], convex), -Math.sqrt(2) / 2)
	floatEqual(t, D.point2convex([ 0, 0 ], convex), -Math.sqrt(2))
	floatEqual(t, D.point2convex([ 1, 0 ], convex), -Math.sqrt(2) / 2)
	floatEqual(t, D.point2convex([ 2, 0 ], convex), 0)

	floatEqual(t, D.point2convex([ -2, -1 ], convex), Math.sqrt(2) / 2)
	floatEqual(t, D.point2convex([ -1, -1 ], convex), 0)
	floatEqual(t, D.point2convex([ 0, -1 ], convex), -Math.sqrt(2) / 2)
	floatEqual(t, D.point2convex([ 1, -1 ], convex), 0)
	floatEqual(t, D.point2convex([ 2, -1 ], convex), Math.sqrt(2) / 2)

	floatEqual(t, D.point2convex([ -2, -2 ], convex), Math.sqrt(2))
	floatEqual(t, D.point2convex([ -1, -2 ], convex), Math.sqrt(2) / 2)
	floatEqual(t, D.point2convex([ 0, -2 ], convex), 0)
	floatEqual(t, D.point2convex([ 1, -2 ], convex), Math.sqrt(2) / 2)
	floatEqual(t, D.point2convex([ 2, -2 ], convex), Math.sqrt(2))
})

/* eslint-disable comma-spacing */
const concave = [ -2,-1, -2,1, 0,1, 0,0, 1,0, 1,-1 ]
/* eslint-enable comma-spacing */

test("geometry.sdf.point2polygon", (t) => {
	floatEqual(t, D.point2polygon([ -2, 2 ], concave), 1)
	floatEqual(t, D.point2polygon([ -1, 2 ], concave), 1)
	floatEqual(t, D.point2polygon([ 0, 2 ], concave), 1)
	floatEqual(t, D.point2polygon([ 1, 2 ], concave), Math.sqrt(2))
	floatEqual(t, D.point2polygon([ 2, 2 ], concave), Math.sqrt(5))

	floatEqual(t, D.point2polygon([ -2, 1 ], concave), 0)
	floatEqual(t, D.point2polygon([ -1, 1 ], concave), 0)
	floatEqual(t, D.point2polygon([ 0, 1 ], concave), 0)
	floatEqual(t, D.point2polygon([ 1, 1 ], concave), 1)
	floatEqual(t, D.point2polygon([ 2, 1 ], concave), Math.sqrt(2))

	floatEqual(t, D.point2polygon([ -2, 0 ], concave), 0)
	floatEqual(t, D.point2polygon([ -1, 0 ], concave), -1)
	floatEqual(t, D.point2polygon([ 0, 0 ], concave), 0)
	floatEqual(t, D.point2polygon([ 1, 0 ], concave), 0)
	floatEqual(t, D.point2polygon([ 2, 0 ], concave), 1)

	floatEqual(t, D.point2polygon([ -2, -1 ], concave), 0)
	floatEqual(t, D.point2polygon([ -1, -1 ], concave), 0)
	floatEqual(t, D.point2polygon([ 0, -1 ], concave), 0)
	floatEqual(t, D.point2polygon([ 1, -1 ], concave), 0)
	floatEqual(t, D.point2polygon([ 2, -1 ], concave), 1)

	floatEqual(t, D.point2polygon([ -2, -2 ], concave), 1)
	floatEqual(t, D.point2polygon([ -1, -2 ], concave), 1)
	floatEqual(t, D.point2polygon([ 0, -2 ], concave), 1)
	floatEqual(t, D.point2polygon([ 1, -2 ], concave), 1)
	floatEqual(t, D.point2polygon([ 2, -2 ], concave), Math.sqrt(2))
})
