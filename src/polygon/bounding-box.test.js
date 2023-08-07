const { test } = require('@kmamal/testing')
const N = require('@kmamal/numbers/js')
const { boundingBox } = require('./bounding-box').defineFor(N)

test("geometry.polygon.boundingBox", (t) => {
	/* eslint-disable comma-spacing */
	t.equal(boundingBox([ 0,0, 1,1 ]), { left: 0, right: 1, top: 1, bottom: 0 })
	t.equal(boundingBox([ 1,1, 0,0 ]), { left: 0, right: 1, top: 1, bottom: 0 })
	t.equal(boundingBox([ 0,0, 1,1, 1,0 ]), { left: 0, right: 1, top: 1, bottom: 0 })
	t.equal(boundingBox([ 0,0, 1,0, 1,1 ]), { left: 0, right: 1, top: 1, bottom: 0 })
	t.equal(boundingBox([ 0,0, 0,1, 1,1, 1,0 ]), { left: 0, right: 1, top: 1, bottom: 0 })
	t.equal(boundingBox([ 0,0, 1,0, 1,1, 0,1 ]), { left: 0, right: 1, top: 1, bottom: 0 })
	/* eslint-enable comma-spacing */
})
