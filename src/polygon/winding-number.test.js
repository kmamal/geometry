const { test } = require('@kmamal/testing')
const N = require('../../../domains/number')
const { windingNumber } = require('./winding-number').defineFor(N)

/* eslint-disable comma-spacing */
const polygon = [ 0,0, 0,2, 2,2, 2,1, 1,1, 1,2, 2,2, 2,0 ]
/* eslint-enable comma-spacing */

test("geometry.polygon.windingNumber", (t) => {
	t.equal(windingNumber([ 0, 0 ], polygon), 1)
	t.equal(windingNumber([ 0, 1 ], polygon), 1)
	t.equal(windingNumber([ 1, 0 ], polygon), 1)
	t.equal(windingNumber([ 0, 2 ], polygon), 1)
	t.equal(windingNumber([ 2, 0 ], polygon), 1)
	t.equal(windingNumber([ 0.5, 0.5 ], polygon), 1)
	t.equal(windingNumber([ 1, 1 ], polygon), 2)
	t.equal(windingNumber([ 1, 1.5 ], polygon), 2)
	t.equal(windingNumber([ 1.5, 1 ], polygon), 2)
	t.equal(windingNumber([ 1, 2 ], polygon), 2)
	t.equal(windingNumber([ 2, 1 ], polygon), 2)
	t.equal(windingNumber([ 1.5, 1.5 ], polygon), 2)
	t.equal(windingNumber([ 1.5, 2 ], polygon), 2)
	t.equal(windingNumber([ 2, 1.5 ], polygon), 2)
	t.equal(windingNumber([ 2, 2 ], polygon), 2)
	t.equal(windingNumber([ 2.5, 2.5 ], polygon), 0)
})
