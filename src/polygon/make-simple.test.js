const { test } = require('@kmamal/testing')
const N = require('../../../domains/number')
const { makeSimple } = require('./make-simple').defineFor(N)
const { isEqual } = require('./is-equal').defineFor(N)

const polygonSetsEqual = (t, actual, expected) => {
	if (actual.length !== expected.length) {
		t.fail({ actual, expected })
	}

	const set1 = actual.slice()
	const set2 = expected.slice()
	next1:
	for (let index1 = 0; index1 < set1.length; index1++) {
		const p1 = set1[index1]
		for (let index2 = 0; index2 < set2.length; index2++) {
			const p2 = set2[index2]
			if (!isEqual(p1, p2)) { continue }
			set2.splice(index2, 1)
			continue next1
		}
		t.fail({ actual, expected })
	}
}

test("geometry.polygon.makeSimple", (t) => {
	/* eslint-disable comma-spacing */
	polygonSetsEqual(
		t,
		makeSimple([ -1,1, 1,1, 0,0, 1,-1, -1,-1, 0,0 ]),
		[
			[ -1,1, 1,1, 0,0 ],
			[ 1,-1, -1,-1, 0,0 ],
		],
	)
	polygonSetsEqual(
		t,
		makeSimple([ -1,1, 1,1, 0,0, -1,-1, 1,-1, 0,0 ]),
		[
			[ -1,1, 1,1, 0,0 ],
			[ 0,0, -1,-1, 1,-1 ],
		],
	)

	polygonSetsEqual(
		t,
		makeSimple([ -1,1, 0,1, 0,-1, -1,-1, 0,0 ]),
		[
			[ -1,1, 0,1, 0,0 ],
			[ 0,0, 0,-1, -1,-1 ],
		],
	)
	polygonSetsEqual(
		t,
		makeSimple([ -1,0, 1,0, 1,-1, 0,0, -1,-1 ]),
		[
			[ -1,0, 0,0, -1,-1 ],
			[ 0,0, 1,0, 1,-1 ],
		],
	)

	polygonSetsEqual(
		t,
		makeSimple([ 0,1, 1,0, -1,-2, -1,-1, 0,0, 1,-1, 1,-2, -1,0 ]),
		[
			[ 0,1, 1,0, 0.5,-0.5, 1,-1, 1,-2, 0,-1, -1,-2, -1,-1, -0.5,-0.5, -1,0 ],
			[ -0.5,-0.5, 0,0, 0.5,-0.5, 0,-1 ],
		],
	)
	polygonSetsEqual(
		t,
		makeSimple([ 0,2, 3,0, 1,-1, -1,1, 0,2, 1,1, -1,-1, -3,0 ]),
		[
			[ 0,2, 3,0, 1,-1, 0,0, -1,-1, -3,0 ],
			[ 0,0, -1,1, 0,2, 1,1 ],
		],
	)

	polygonSetsEqual(
		t,
		makeSimple([ 0,1, 1,1, -1,-1, -1,1, 1,-1, 0,-1 ]),
		[
			[ 0,1, 1,1, 0,0 ],
			[ -1,1, 0,0, -1,-1 ],
			[ 0,0, 1,-1, 0,-1 ],
		],
	)

	polygonSetsEqual(
		t,
		makeSimple([ 0,0, 0,2, 3,2, 3,1, 1,1, 1,2, 2,2, 2,0 ]),
		[
			[ 0,0, 0,2, 3,2, 3,1, 2,1, 2,0 ],
			[ 2,1, 1,1, 1,2, 2,2 ],
		],
	)
	polygonSetsEqual(
		t,
		makeSimple([ 0,0, 0,2, 2,2, 2,1, 1,1, 1,2, 2,2, 2,0 ]),
		[
			[ 0,0, 0,2, 2,2, 2,0 ],
			[ 2,2, 2,1, 1,1, 1,2 ],
		],
	)
	polygonSetsEqual(
		t,
		makeSimple([ 0,0, 1,1, 2,0, 3,0, 4,-1, 5,0 ]),
		[
			[ 0,0, 1,1, 2,0 ],
			[ 2,0, 3,0 ],
			[ 3,0, 4,-1, 5,0 ],
		],
	)
	polygonSetsEqual(
		t,
		makeSimple([ 0,0, 1,1, 2,0, 3,0, 4,1, 5,0 ]),
		[
			[ 0,0, 1,1, 2,0 ],
			[ 2,0, 3,0 ],
			[ 3,0, 4,1, 5,0 ],
		],
	)

	polygonSetsEqual(
		t,
		makeSimple([ 0,0, 0,1, 1,1, 1,0, 0,0, 0,1, 1,1, 1,0 ]),
		[
			[ 0,0, 0,1, 1,1, 1,0 ],
			[ 0,0, 0,1, 1,1, 1,0 ],
		],
	)
	/* eslint-enable comma-spacing */
})
