const { test } = require('@kmamal/testing')
const N = require('@kmamal/numbers/js')
const { isConvex } = require('./is-convex').defineFor(N)

test("geometry.polygon.isConvex", (t) => {
	/* eslint-disable comma-spacing */
	t.equal(isConvex([ 0,0, 1,0 ]), true)
	t.equal(isConvex([ 0,0, 1,1, 1,0 ]), true)
	t.equal(isConvex([ 0,0, 1,0, 1,1 ]), false)
	t.equal(isConvex([ 0,0, 0,1, 1,1, 1,0 ]), true)
	t.equal(isConvex([ 0,0, 1,0, 1,1, 0,1 ]), false)
	t.equal(isConvex([ 0,0, 0,2, 1,2, 1,1, 2,1, 2,0 ]), false)
	/* eslint-enable comma-spacing */
})
