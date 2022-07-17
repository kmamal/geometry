const { test } = require('@kmamal/testing')
const N = require('../../../domains/number')
const D = require('./from-circle').defineFor(N)

const floatEqual = (t, actual, expected, tollerance = 1e-5) => t.ok(
	expected - tollerance <= actual && actual <= expected + tollerance,
	{ actual, expected },
)

test("geometry.sdf.circle2circle", (t) => {
	floatEqual(t, D.circle2circle([ -1, 1 ], 0.5, 0.5), Math.sqrt(2) - 1)
	floatEqual(t, D.circle2circle([ 0, 1 ], 0.5, 0.5), 0)
	floatEqual(t, D.circle2circle([ 1, 1 ], 0.5, 0.5), Math.sqrt(2) - 1)

	floatEqual(t, D.circle2circle([ -1, 0 ], 0.5, 0.5), 0)
	floatEqual(t, D.circle2circle([ 0, 0 ], 0.5, 0.5), -1)
	floatEqual(t, D.circle2circle([ 1, 0 ], 0.5, 0.5), 0)

	floatEqual(t, D.circle2circle([ -1, -1 ], 0.5, 0.5), Math.sqrt(2) - 1)
	floatEqual(t, D.circle2circle([ 0, -1 ], 0.5, 0.5), 0)
	floatEqual(t, D.circle2circle([ 1, -1 ], 0.5, 0.5), Math.sqrt(2) - 1)
})

test("geometry.sdf.circle2halfplane", (t) => {
	floatEqual(t, D.circle2halfplane([ -1, 1 ], 0.5, [ -1, -1 ], [ 1, 1 ]), Math.sqrt(2) - 0.5)
	floatEqual(t, D.circle2halfplane([ 0, 1 ], 0.5, [ -1, -1 ], [ 1, 1 ]), Math.sqrt(2) / 2 - 0.5)
	floatEqual(t, D.circle2halfplane([ 1, 1 ], 0.5, [ -1, -1 ], [ 1, 1 ]), -0.5)

	floatEqual(t, D.circle2halfplane([ -1, 0 ], 0.5, [ -1, -1 ], [ 1, 1 ]), Math.sqrt(2) / 2 - 0.5)
	floatEqual(t, D.circle2halfplane([ 0, 0 ], 0.5, [ -1, -1 ], [ 1, 1 ]), -0.5)
	floatEqual(t, D.circle2halfplane([ 1, 0 ], 0.5, [ -1, -1 ], [ 1, 1 ]), -Math.sqrt(2) / 2 - 0.5)

	floatEqual(t, D.circle2halfplane([ -1, -1 ], 0.5, [ -1, -1 ], [ 1, 1 ]), -0.5)
	floatEqual(t, D.circle2halfplane([ 0, -1 ], 0.5, [ -1, -1 ], [ 1, 1 ]), -Math.sqrt(2) / 2 - 0.5)
	floatEqual(t, D.circle2halfplane([ 1, -1 ], 0.5, [ -1, -1 ], [ 1, 1 ]), -Math.sqrt(2) - 0.5)
})

test("geometry.sdf.circle2line", (t) => {
	floatEqual(t, D.circle2line([ -1, 1 ], 0.5, [ -1, -1 ], [ 1, 1 ]), Math.sqrt(2) - 0.5)
	floatEqual(t, D.circle2line([ 0, 1 ], 0.5, [ -1, -1 ], [ 1, 1 ]), Math.sqrt(2) / 2 - 0.5)
	floatEqual(t, D.circle2line([ 1, 1 ], 0.5, [ -1, -1 ], [ 1, 1 ]), -0.5)

	floatEqual(t, D.circle2line([ -1, 0 ], 0.5, [ -1, -1 ], [ 1, 1 ]), Math.sqrt(2) / 2 - 0.5)
	floatEqual(t, D.circle2line([ 0, 0 ], 0.5, [ -1, -1 ], [ 1, 1 ]), -0.5)
	floatEqual(t, D.circle2line([ 1, 0 ], 0.5, [ -1, -1 ], [ 1, 1 ]), Math.sqrt(2) / 2 - 0.5)

	floatEqual(t, D.circle2line([ -1, -1 ], 0.5, [ -1, -1 ], [ 1, 1 ]), -0.5)
	floatEqual(t, D.circle2line([ 0, -1 ], 0.5, [ -1, -1 ], [ 1, 1 ]), Math.sqrt(2) / 2 - 0.5)
	floatEqual(t, D.circle2line([ 1, -1 ], 0.5, [ -1, -1 ], [ 1, 1 ]), Math.sqrt(2) - 0.5)
})

test("geometry.sdf.circle2segment", (t) => {
	floatEqual(t, D.circle2segment([ -2, 1 ], 0.5, [ -1, 0 ], [ 1, 0 ]), Math.sqrt(2) - 0.5)
	floatEqual(t, D.circle2segment([ -1, 1 ], 0.5, [ -1, 0 ], [ 1, 0 ]), 0.5)
	floatEqual(t, D.circle2segment([ 0, 1 ], 0.5, [ -1, 0 ], [ 1, 0 ]), 0.5)
	floatEqual(t, D.circle2segment([ 1, 1 ], 0.5, [ -1, 0 ], [ 1, 0 ]), 0.5)
	floatEqual(t, D.circle2segment([ 2, 1 ], 0.5, [ -1, 0 ], [ 1, 0 ]), Math.sqrt(2) - 0.5)

	floatEqual(t, D.circle2segment([ -2, 0 ], 0.5, [ -1, 0 ], [ 1, 0 ]), 0.5)
	floatEqual(t, D.circle2segment([ -1, 0 ], 0.5, [ -1, 0 ], [ 1, 0 ]), -0.5)
	floatEqual(t, D.circle2segment([ 0, 0 ], 0.5, [ -1, 0 ], [ 1, 0 ]), -0.5)
	floatEqual(t, D.circle2segment([ 1, 0 ], 0.5, [ -1, 0 ], [ 1, 0 ]), -0.5)
	floatEqual(t, D.circle2segment([ 2, 0 ], 0.5, [ -1, 0 ], [ 1, 0 ]), 0.5)

	floatEqual(t, D.circle2segment([ -2, -1 ], 0.5, [ -1, 0 ], [ 1, 0 ]), Math.sqrt(2) - 0.5)
	floatEqual(t, D.circle2segment([ -1, -1 ], 0.5, [ -1, 0 ], [ 1, 0 ]), 0.5)
	floatEqual(t, D.circle2segment([ 0, -1 ], 0.5, [ -1, 0 ], [ 1, 0 ]), 0.5)
	floatEqual(t, D.circle2segment([ 1, -1 ], 0.5, [ -1, 0 ], [ 1, 0 ]), 0.5)
	floatEqual(t, D.circle2segment([ 2, -1 ], 0.5, [ -1, 0 ], [ 1, 0 ]), Math.sqrt(2) - 0.5)
})

test("geometry.sdf.circle2box", (t) => {
	floatEqual(t, D.circle2box([ -2, 2 ], 0.5, 2, 3), Math.sqrt(1.25) - 0.5)
	floatEqual(t, D.circle2box([ -1, 2 ], 0.5, 2, 3), 0)
	floatEqual(t, D.circle2box([ 0, 2 ], 0.5, 2, 3), 0)
	floatEqual(t, D.circle2box([ 1, 2 ], 0.5, 2, 3), 0)
	floatEqual(t, D.circle2box([ 2, 2 ], 0.5, 2, 3), Math.sqrt(1.25) - 0.5)

	floatEqual(t, D.circle2box([ -2, 1 ], 0.5, 2, 3), 0.5)
	floatEqual(t, D.circle2box([ -1, 1 ], 0.5, 2, 3), -0.5)
	floatEqual(t, D.circle2box([ 0, 1 ], 0.5, 2, 3), -1)
	floatEqual(t, D.circle2box([ 1, 1 ], 0.5, 2, 3), -0.5)
	floatEqual(t, D.circle2box([ 2, 1 ], 0.5, 2, 3), 0.5)

	floatEqual(t, D.circle2box([ -2, 0 ], 0.5, 2, 3), 0.5)
	floatEqual(t, D.circle2box([ -1, 0 ], 0.5, 2, 3), -0.5)
	floatEqual(t, D.circle2box([ 0, 0 ], 0.5, 2, 3), -1.5)
	floatEqual(t, D.circle2box([ 1, 0 ], 0.5, 2, 3), -0.5)
	floatEqual(t, D.circle2box([ 2, 0 ], 0.5, 2, 3), 0.5)

	floatEqual(t, D.circle2box([ -2, -1 ], 0.5, 2, 3), 0.5)
	floatEqual(t, D.circle2box([ -1, -1 ], 0.5, 2, 3), -0.5)
	floatEqual(t, D.circle2box([ 0, -1 ], 0.5, 2, 3), -1)
	floatEqual(t, D.circle2box([ 1, -1 ], 0.5, 2, 3), -0.5)
	floatEqual(t, D.circle2box([ 2, -1 ], 0.5, 2, 3), 0.5)

	floatEqual(t, D.circle2box([ -2, -2 ], 0.5, 2, 3), Math.sqrt(1.25) - 0.5)
	floatEqual(t, D.circle2box([ -1, -2 ], 0.5, 2, 3), 0)
	floatEqual(t, D.circle2box([ 0, -2 ], 0.5, 2, 3), 0)
	floatEqual(t, D.circle2box([ 1, -2 ], 0.5, 2, 3), 0)
	floatEqual(t, D.circle2box([ 2, -2 ], 0.5, 2, 3), Math.sqrt(1.25) - 0.5)
})

/* eslint-disable comma-spacing */
const convex = [ 0,-2, -2,0, 0,2, 2,0 ]
/* eslint-enable comma-spacing */

test("geometry.sdf.circle2convex", (t) => {
	floatEqual(t, D.circle2convex([ -2, 2 ], 0.5, convex), Math.sqrt(2) - 0.5)
	floatEqual(t, D.circle2convex([ -1, 2 ], 0.5, convex), Math.sqrt(2) / 2 - 0.5)
	floatEqual(t, D.circle2convex([ 0, 2 ], 0.5, convex), -0.5)
	floatEqual(t, D.circle2convex([ 1, 2 ], 0.5, convex), Math.sqrt(2) / 2 - 0.5)
	floatEqual(t, D.circle2convex([ 2, 2 ], 0.5, convex), Math.sqrt(2) - 0.5)

	floatEqual(t, D.circle2convex([ -2, 1 ], 0.5, convex), Math.sqrt(2) / 2 - 0.5)
	floatEqual(t, D.circle2convex([ -1, 1 ], 0.5, convex), -0.5)
	floatEqual(t, D.circle2convex([ 0, 1 ], 0.5, convex), -Math.sqrt(2) / 2 - 0.5)
	floatEqual(t, D.circle2convex([ 1, 1 ], 0.5, convex), -0.5)
	floatEqual(t, D.circle2convex([ 2, 1 ], 0.5, convex), Math.sqrt(2) / 2 - 0.5)

	floatEqual(t, D.circle2convex([ -2, 0 ], 0.5, convex), -0.5)
	floatEqual(t, D.circle2convex([ -1, 0 ], 0.5, convex), -Math.sqrt(2) / 2 - 0.5)
	floatEqual(t, D.circle2convex([ 0, 0 ], 0.5, convex), -Math.sqrt(2) - 0.5)
	floatEqual(t, D.circle2convex([ 1, 0 ], 0.5, convex), -Math.sqrt(2) / 2 - 0.5)
	floatEqual(t, D.circle2convex([ 2, 0 ], 0.5, convex), -0.5)

	floatEqual(t, D.circle2convex([ -2, -1 ], 0.5, convex), Math.sqrt(2) / 2 - 0.5)
	floatEqual(t, D.circle2convex([ -1, -1 ], 0.5, convex), -0.5)
	floatEqual(t, D.circle2convex([ 0, -1 ], 0.5, convex), -Math.sqrt(2) / 2 - 0.5)
	floatEqual(t, D.circle2convex([ 1, -1 ], 0.5, convex), -0.5)
	floatEqual(t, D.circle2convex([ 2, -1 ], 0.5, convex), Math.sqrt(2) / 2 - 0.5)

	floatEqual(t, D.circle2convex([ -2, -2 ], 0.5, convex), Math.sqrt(2) - 0.5)
	floatEqual(t, D.circle2convex([ -1, -2 ], 0.5, convex), Math.sqrt(2) / 2 - 0.5)
	floatEqual(t, D.circle2convex([ 0, -2 ], 0.5, convex), -0.5)
	floatEqual(t, D.circle2convex([ 1, -2 ], 0.5, convex), Math.sqrt(2) / 2 - 0.5)
	floatEqual(t, D.circle2convex([ 2, -2 ], 0.5, convex), Math.sqrt(2) - 0.5)
})

/* eslint-disable comma-spacing */
const concave = [ -2,-1, -2,1, 0,1, 0,0, 1,0, 1,-1 ]
/* eslint-enable comma-spacing */

test("geometry.sdf.circle2polygon", (t) => {
	floatEqual(t, D.circle2polygon([ -2, 2 ], 0.5, concave), 0.5)
	floatEqual(t, D.circle2polygon([ -1, 2 ], 0.5, concave), 0.5)
	floatEqual(t, D.circle2polygon([ 0, 2 ], 0.5, concave), 0.5)
	floatEqual(t, D.circle2polygon([ 1, 2 ], 0.5, concave), Math.sqrt(2) - 0.5)
	floatEqual(t, D.circle2polygon([ 2, 2 ], 0.5, concave), Math.sqrt(5) - 0.5)

	floatEqual(t, D.circle2polygon([ -2, 1 ], 0.5, concave), -0.5)
	floatEqual(t, D.circle2polygon([ -1, 1 ], 0.5, concave), -0.5)
	floatEqual(t, D.circle2polygon([ 0, 1 ], 0.5, concave), -0.5)
	floatEqual(t, D.circle2polygon([ 1, 1 ], 0.5, concave), 0.5)
	floatEqual(t, D.circle2polygon([ 2, 1 ], 0.5, concave), Math.sqrt(2) - 0.5)

	floatEqual(t, D.circle2polygon([ -2, 0 ], 0.5, concave), -0.5)
	floatEqual(t, D.circle2polygon([ -1, 0 ], 0.5, concave), -1.5)
	floatEqual(t, D.circle2polygon([ 0, 0 ], 0.5, concave), -0.5)
	floatEqual(t, D.circle2polygon([ 1, 0 ], 0.5, concave), -0.5)
	floatEqual(t, D.circle2polygon([ 2, 0 ], 0.5, concave), 0.5)

	floatEqual(t, D.circle2polygon([ -2, -1 ], 0.5, concave), -0.5)
	floatEqual(t, D.circle2polygon([ -1, -1 ], 0.5, concave), -0.5)
	floatEqual(t, D.circle2polygon([ 0, -1 ], 0.5, concave), -0.5)
	floatEqual(t, D.circle2polygon([ 1, -1 ], 0.5, concave), -0.5)
	floatEqual(t, D.circle2polygon([ 2, -1 ], 0.5, concave), 0.5)

	floatEqual(t, D.circle2polygon([ -2, -2 ], 0.5, concave), 0.5)
	floatEqual(t, D.circle2polygon([ -1, -2 ], 0.5, concave), 0.5)
	floatEqual(t, D.circle2polygon([ 0, -2 ], 0.5, concave), 0.5)
	floatEqual(t, D.circle2polygon([ 1, -2 ], 0.5, concave), 0.5)
	floatEqual(t, D.circle2polygon([ 2, -2 ], 0.5, concave), Math.sqrt(2) - 0.5)
})
