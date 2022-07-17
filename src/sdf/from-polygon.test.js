const { test } = require('@kmamal/testing')
const N = require('../../../domains/number')
const D = require('./from-polygon').defineFor(N)

const floatEqual = (t, actual, expected, tollerance = 1e-5) => t.ok(
	expected - tollerance <= actual && actual <= expected + tollerance,
	{ actual, expected },
)

test("geometry.sdf.polygon2polygon", (t) => {
	/* eslint-disable comma-spacing */
	floatEqual(t, D.polygon2polygon(
		[ -1,-1, 0,0, -1,1 ],
		[ 1,-1, 0,0, 1,1 ],
	), 0)
	/* eslint-enable comma-spacing */
})
