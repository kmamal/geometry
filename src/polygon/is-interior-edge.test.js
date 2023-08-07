const { test } = require('@kmamal/testing')
const N = require('@kmamal/numbers/js')
const { isInteriorEdge } = require('./is-interior-edge').defineFor(N)

/* eslint-disable comma-spacing */
const polygon = [ 0,0, 0,3, 1,3, 1,1, 3,1, 3,0 ]
/* eslint-enable comma-spacing */

test("geometry.polygon.isInteriorEdge", (t) => {
	t.equal(isInteriorEdge(polygon, 0, 2), false)
	t.equal(isInteriorEdge(polygon, 0, 4), true)
	t.equal(isInteriorEdge(polygon, 0, 6), true)
	t.equal(isInteriorEdge(polygon, 0, 8), true)
	t.equal(isInteriorEdge(polygon, 0, 10), false)

	t.equal(isInteriorEdge(polygon, 2, 0), false)
	t.equal(isInteriorEdge(polygon, 2, 4), false)
	t.equal(isInteriorEdge(polygon, 2, 6), true)
	t.equal(isInteriorEdge(polygon, 2, 8), false)
	t.equal(isInteriorEdge(polygon, 2, 10), false)

	t.equal(isInteriorEdge(polygon, 4, 0), true)
	t.equal(isInteriorEdge(polygon, 4, 2), false)
	t.equal(isInteriorEdge(polygon, 4, 6), false)
	t.equal(isInteriorEdge(polygon, 4, 8), false)
	t.equal(isInteriorEdge(polygon, 4, 10), false)

	t.equal(isInteriorEdge(polygon, 6, 0), true)
	t.equal(isInteriorEdge(polygon, 6, 2), true)
	t.equal(isInteriorEdge(polygon, 6, 4), false)
	t.equal(isInteriorEdge(polygon, 6, 8), false)
	t.equal(isInteriorEdge(polygon, 6, 10), true)

	t.equal(isInteriorEdge(polygon, 8, 0), true)
	t.equal(isInteriorEdge(polygon, 8, 2), false)
	t.equal(isInteriorEdge(polygon, 8, 4), false)
	t.equal(isInteriorEdge(polygon, 8, 6), false)
	t.equal(isInteriorEdge(polygon, 8, 10), false)
})
