const { test } = require('@kmamal/testing')
const N = require('@kmamal/numbers/js')
const { isSimple } = require('./is-simple').defineFor(N)

test("geometry.polygon.isSimple", (t) => {
	/* eslint-disable comma-spacing */
	t.equal(isSimple([ 0,0, 1,1 ]), false)
	t.equal(isSimple([ 0,0, 0,1, 1,0 ]), true)
	t.equal(isSimple([ 0,0, 1,0, 0,1 ]), true)
	t.equal(isSimple([ 0,0, 0,1, 1,1, 1,0 ]), true)
	t.equal(isSimple([ 0,0, 0,1, -1,0, 1,1 ]), false)
	t.equal(isSimple([ 0,0, 0,2, 1,1, 2,2, 2,0 ]), true)
	t.equal(isSimple([ 0,0, 0,2, 1,0, 2,2, 2,0 ]), false)
	t.equal(isSimple([ 0,0, 0,2, 0,1, 1,1, 1,0 ]), false)
	t.equal(isSimple([ -2,0, 1,0, 2,1, 2,0, -1,0, -2,1 ]), false)
	t.equal(isSimple([ -2,0, 1,0, 2,1, 2,0, -1,0, -2,-1 ]), false)
	/* eslint-enable comma-spacing */
})
