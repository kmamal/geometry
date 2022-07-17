const { test } = require('@kmamal/testing')
const N = require('../../domains/number')
const I = require('./includes').defineFor(N)

test("geometry.distance.pointInPoint", (t) => {
	t.equal(I.pointInPoint([ 0, 0 ], [ 0, 0 ]), true)
	t.equal(I.pointInPoint([ 0, 0 ], [ 1, 0 ]), false)
	t.equal(I.pointInPoint([ 0, 0 ], [ 0, 1 ]), false)
	t.equal(I.pointInPoint([ 0, 0 ], [ 1, 1 ]), false)
	t.equal(I.pointInPoint([ 1, 1 ], [ 1, 1 ]), true)
})

test("geometry.distance.pointInCircle", (t) => {
	t.equal(I.pointInCircle([ -2, 2 ], 1), false)
	t.equal(I.pointInCircle([ -1, 2 ], 1), false)
	t.equal(I.pointInCircle([ 0, 2 ], 1), false)
	t.equal(I.pointInCircle([ 1, 2 ], 1), false)
	t.equal(I.pointInCircle([ 2, 2 ], 1), false)

	t.equal(I.pointInCircle([ -2, 1 ], 1), false)
	t.equal(I.pointInCircle([ -1, 1 ], 1), false)
	t.equal(I.pointInCircle([ 0, 1 ], 1), true)
	t.equal(I.pointInCircle([ 1, 1 ], 1), false)
	t.equal(I.pointInCircle([ 2, 1 ], 1), false)

	t.equal(I.pointInCircle([ -2, 0 ], 1), false)
	t.equal(I.pointInCircle([ -1, 0 ], 1), true)
	t.equal(I.pointInCircle([ 0, 0 ], 1), true)
	t.equal(I.pointInCircle([ 1, 0 ], 1), true)
	t.equal(I.pointInCircle([ 2, 0 ], 1), false)

	t.equal(I.pointInCircle([ -2, -1 ], 1), false)
	t.equal(I.pointInCircle([ -1, -1 ], 1), false)
	t.equal(I.pointInCircle([ 0, -1 ], 1), true)
	t.equal(I.pointInCircle([ 1, -1 ], 1), false)
	t.equal(I.pointInCircle([ 2, -1 ], 1), false)

	t.equal(I.pointInCircle([ -2, -2 ], 1), false)
	t.equal(I.pointInCircle([ -1, -2 ], 1), false)
	t.equal(I.pointInCircle([ 0, -2 ], 1), false)
	t.equal(I.pointInCircle([ 1, -2 ], 1), false)
	t.equal(I.pointInCircle([ 2, -2 ], 1), false)
})

test("geometry.distance.pointInHalfplane", (t) => {
	t.equal(I.pointInHalfplane([ -2, 1 ], [ -1, 0 ], [ 1, 0 ]), false)
	t.equal(I.pointInHalfplane([ -1, 1 ], [ -1, 0 ], [ 1, 0 ]), false)
	t.equal(I.pointInHalfplane([ 0, 1 ], [ -1, 0 ], [ 1, 0 ]), false)
	t.equal(I.pointInHalfplane([ 1, 1 ], [ -1, 0 ], [ 1, 0 ]), false)
	t.equal(I.pointInHalfplane([ 2, 1 ], [ -1, 0 ], [ 1, 0 ]), false)

	t.equal(I.pointInHalfplane([ -2, 0 ], [ -1, 0 ], [ 1, 0 ]), true)
	t.equal(I.pointInHalfplane([ -1, 0 ], [ -1, 0 ], [ 1, 0 ]), true)
	t.equal(I.pointInHalfplane([ 0, 0 ], [ -1, 0 ], [ 1, 0 ]), true)
	t.equal(I.pointInHalfplane([ 1, 0 ], [ -1, 0 ], [ 1, 0 ]), true)
	t.equal(I.pointInHalfplane([ 2, 0 ], [ -1, 0 ], [ 1, 0 ]), true)

	t.equal(I.pointInHalfplane([ -2, -1 ], [ -1, 0 ], [ 1, 0 ]), true)
	t.equal(I.pointInHalfplane([ -1, -1 ], [ -1, 0 ], [ 1, 0 ]), true)
	t.equal(I.pointInHalfplane([ 0, -1 ], [ -1, 0 ], [ 1, 0 ]), true)
	t.equal(I.pointInHalfplane([ 1, -1 ], [ -1, 0 ], [ 1, 0 ]), true)
	t.equal(I.pointInHalfplane([ 2, -1 ], [ -1, 0 ], [ 1, 0 ]), true)
})

test("geometry.distance.pointInLine", (t) => {
	t.equal(I.pointInLine([ -2, 1 ], [ -1, 0 ], [ 1, 0 ]), false)
	t.equal(I.pointInLine([ -1, 1 ], [ -1, 0 ], [ 1, 0 ]), false)
	t.equal(I.pointInLine([ 0, 1 ], [ -1, 0 ], [ 1, 0 ]), false)
	t.equal(I.pointInLine([ 1, 1 ], [ -1, 0 ], [ 1, 0 ]), false)
	t.equal(I.pointInLine([ 2, 1 ], [ -1, 0 ], [ 1, 0 ]), false)

	t.equal(I.pointInLine([ -2, 0 ], [ -1, 0 ], [ 1, 0 ]), true)
	t.equal(I.pointInLine([ -1, 0 ], [ -1, 0 ], [ 1, 0 ]), true)
	t.equal(I.pointInLine([ 0, 0 ], [ -1, 0 ], [ 1, 0 ]), true)
	t.equal(I.pointInLine([ 1, 0 ], [ -1, 0 ], [ 1, 0 ]), true)
	t.equal(I.pointInLine([ 2, 0 ], [ -1, 0 ], [ 1, 0 ]), true)

	t.equal(I.pointInLine([ -2, -1 ], [ -1, 0 ], [ 1, 0 ]), false)
	t.equal(I.pointInLine([ -1, -1 ], [ -1, 0 ], [ 1, 0 ]), false)
	t.equal(I.pointInLine([ 0, -1 ], [ -1, 0 ], [ 1, 0 ]), false)
	t.equal(I.pointInLine([ 1, -1 ], [ -1, 0 ], [ 1, 0 ]), false)
	t.equal(I.pointInLine([ 2, -1 ], [ -1, 0 ], [ 1, 0 ]), false)
})

test("geometry.distance.pointInSegment", (t) => {
	t.equal(I.pointInSegment([ -2, 1 ], [ -1, 0 ], [ 1, 0 ]), false)
	t.equal(I.pointInSegment([ -1, 1 ], [ -1, 0 ], [ 1, 0 ]), false)
	t.equal(I.pointInSegment([ 0, 1 ], [ -1, 0 ], [ 1, 0 ]), false)
	t.equal(I.pointInSegment([ 1, 1 ], [ -1, 0 ], [ 1, 0 ]), false)
	t.equal(I.pointInSegment([ 2, 1 ], [ -1, 0 ], [ 1, 0 ]), false)

	t.equal(I.pointInSegment([ -2, 0 ], [ -1, 0 ], [ 1, 0 ]), false)
	t.equal(I.pointInSegment([ -1, 0 ], [ -1, 0 ], [ 1, 0 ]), true)
	t.equal(I.pointInSegment([ 0, 0 ], [ -1, 0 ], [ 1, 0 ]), true)
	t.equal(I.pointInSegment([ 1, 0 ], [ -1, 0 ], [ 1, 0 ]), true)
	t.equal(I.pointInSegment([ 2, 0 ], [ -1, 0 ], [ 1, 0 ]), false)

	t.equal(I.pointInSegment([ -2, -1 ], [ -1, 0 ], [ 1, 0 ]), false)
	t.equal(I.pointInSegment([ -1, -1 ], [ -1, 0 ], [ 1, 0 ]), false)
	t.equal(I.pointInSegment([ 0, -1 ], [ -1, 0 ], [ 1, 0 ]), false)
	t.equal(I.pointInSegment([ 1, -1 ], [ -1, 0 ], [ 1, 0 ]), false)
	t.equal(I.pointInSegment([ 2, -1 ], [ -1, 0 ], [ 1, 0 ]), false)
})

test("geometry.distance.pointInBox", (t) => {
	t.equal(I.pointInBox([ -2, 2 ], 2, 4), false)
	t.equal(I.pointInBox([ -1, 2 ], 2, 4), true)
	t.equal(I.pointInBox([ 0, 2 ], 2, 4), true)
	t.equal(I.pointInBox([ 1, 2 ], 2, 4), true)
	t.equal(I.pointInBox([ 2, 2 ], 2, 4), false)

	t.equal(I.pointInBox([ -2, 1 ], 2, 4), false)
	t.equal(I.pointInBox([ -1, 1 ], 2, 4), true)
	t.equal(I.pointInBox([ 0, 1 ], 2, 4), true)
	t.equal(I.pointInBox([ 1, 1 ], 2, 4), true)
	t.equal(I.pointInBox([ 2, 1 ], 2, 4), false)

	t.equal(I.pointInBox([ -2, 0 ], 2, 4), false)
	t.equal(I.pointInBox([ -1, 0 ], 2, 4), true)
	t.equal(I.pointInBox([ 0, 0 ], 2, 4), true)
	t.equal(I.pointInBox([ 1, 0 ], 2, 4), true)
	t.equal(I.pointInBox([ 2, 0 ], 2, 4), false)

	t.equal(I.pointInBox([ -2, -1 ], 2, 4), false)
	t.equal(I.pointInBox([ -1, -1 ], 2, 4), true)
	t.equal(I.pointInBox([ 0, -1 ], 2, 4), true)
	t.equal(I.pointInBox([ 1, -1 ], 2, 4), true)
	t.equal(I.pointInBox([ 2, -1 ], 2, 4), false)

	t.equal(I.pointInBox([ -2, -2 ], 2, 4), false)
	t.equal(I.pointInBox([ -1, -2 ], 2, 4), true)
	t.equal(I.pointInBox([ 0, -2 ], 2, 4), true)
	t.equal(I.pointInBox([ 1, -2 ], 2, 4), true)
	t.equal(I.pointInBox([ 2, -2 ], 2, 4), false)
})

/* eslint-disable comma-spacing */
const convex = [ -1,0, 0,2, 1,0, 0,-2 ]
/* eslint-enable comma-spacing */

/* eslint-disable comma-spacing */
const concave = [ -1,-1, -1,1, 0,1, 0,0, 1,0, 1,-1 ]
/* eslint-enable comma-spacing */

test("geometry.distance.pointInConvex", (t) => {
	t.equal(I.pointInConvex([ -2, 2 ], convex), false)
	t.equal(I.pointInConvex([ -1, 2 ], convex), false)
	t.equal(I.pointInConvex([ 0, 2 ], convex), true)
	t.equal(I.pointInConvex([ 1, 2 ], convex), false)
	t.equal(I.pointInConvex([ 2, 2 ], convex), false)

	t.equal(I.pointInConvex([ -2, 1 ], convex), false)
	t.equal(I.pointInConvex([ -1, 1 ], convex), false)
	t.equal(I.pointInConvex([ 0, 1 ], convex), true)
	t.equal(I.pointInConvex([ 1, 1 ], convex), false)
	t.equal(I.pointInConvex([ 2, 1 ], convex), false)

	t.equal(I.pointInConvex([ -2, 0 ], convex), false)
	t.equal(I.pointInConvex([ -1, 0 ], convex), true)
	t.equal(I.pointInConvex([ 0, 0 ], convex), true)
	t.equal(I.pointInConvex([ 1, 0 ], convex), true)
	t.equal(I.pointInConvex([ 2, 0 ], convex), false)

	t.equal(I.pointInConvex([ -2, -1 ], convex), false)
	t.equal(I.pointInConvex([ -1, -1 ], convex), false)
	t.equal(I.pointInConvex([ 0, -1 ], convex), true)
	t.equal(I.pointInConvex([ 1, -1 ], convex), false)
	t.equal(I.pointInConvex([ 2, -1 ], convex), false)

	t.equal(I.pointInConvex([ -2, -2 ], convex), false)
	t.equal(I.pointInConvex([ -1, -2 ], convex), false)
	t.equal(I.pointInConvex([ 0, -2 ], convex), true)
	t.equal(I.pointInConvex([ 1, -2 ], convex), false)
	t.equal(I.pointInConvex([ 2, -2 ], convex), false)
})

test("geometry.distance.pointInPolygon", (t) => {
	t.equal(I.pointInPolygon([ -2, 2 ], concave), false)
	t.equal(I.pointInPolygon([ -1, 2 ], concave), false)
	t.equal(I.pointInPolygon([ 0, 2 ], concave), false)
	t.equal(I.pointInPolygon([ 1, 2 ], concave), false)
	t.equal(I.pointInPolygon([ 2, 2 ], concave), false)

	t.equal(I.pointInPolygon([ -2, 1 ], concave), false)
	t.equal(I.pointInPolygon([ -1, 1 ], concave), true)
	t.equal(I.pointInPolygon([ 0, 1 ], concave), true)
	t.equal(I.pointInPolygon([ 1, 1 ], concave), false)
	t.equal(I.pointInPolygon([ 2, 1 ], concave), false)

	t.equal(I.pointInPolygon([ -2, 0 ], concave), false)
	t.equal(I.pointInPolygon([ -1, 0 ], concave), true)
	t.equal(I.pointInPolygon([ 0, 0 ], concave), true)
	t.equal(I.pointInPolygon([ 1, 0 ], concave), true)
	t.equal(I.pointInPolygon([ 2, 0 ], concave), false)

	t.equal(I.pointInPolygon([ -2, -1 ], concave), false)
	t.equal(I.pointInPolygon([ -1, -1 ], concave), true)
	t.equal(I.pointInPolygon([ 0, -1 ], concave), true)
	t.equal(I.pointInPolygon([ 1, -1 ], concave), true)
	t.equal(I.pointInPolygon([ 2, -1 ], concave), false)

	t.equal(I.pointInPolygon([ -2, -2 ], concave), false)
	t.equal(I.pointInPolygon([ -1, -2 ], concave), false)
	t.equal(I.pointInPolygon([ 0, -2 ], concave), false)
	t.equal(I.pointInPolygon([ 1, -2 ], concave), false)
	t.equal(I.pointInPolygon([ 2, -2 ], concave), false)
})
