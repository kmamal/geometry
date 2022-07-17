const { test } = require('@kmamal/testing')
const N = require('../../../domains/number')
const D = require('./from-convex').defineFor(N)

const floatEqual = (t, actual, expected, tollerance = 1e-5) => t.ok(
	expected - tollerance <= actual && actual <= expected + tollerance,
	{ actual, expected },
)

test("geometry.sdf.convex2convex", (t) => {
	/* eslint-disable comma-spacing */
	floatEqual(t, D.convex2convex(
		[ -1,-1, -1,1, 0,0 ],
		[ 1,1, 1,-1, 0,0 ],
	), 0)
	floatEqual(t, D.convex2convex(
		[ 1,-1, -1,-1, 0,0 ],
		[ -1,1, 1,1, 0,0 ],
	), 0)
	/* eslint-enable comma-spacing */
})

test("geometry.sdf.convex2polygon", (t) => {
	/* eslint-disable comma-spacing */
	floatEqual(t, D.convex2polygon(
		[ 0,0, 0,1, 1,0 ],
		[ 0,0, 1,0, 0,-1, -1,0, 0,1 ],
	), 0)
	/* eslint-enable comma-spacing */
})
