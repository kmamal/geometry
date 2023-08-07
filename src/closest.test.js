// const { test } = require('@kmamal/testing')
// const N = require('@kmamal/numbers/js')
// const C = require('./closest').defineFor(N)

// const vec2Equal = (t, actual, expected, tollerance = 1e-5) => t.ok(
// 	Math.abs(V2.norm(V2.sub(actual, expected))) < tollerance,
// 	{ actual, expected },
// )

// test("geometry.closest.point2point", (t) => {
// 	vec2Equal(t, C.point2point([ 0, 0 ], [ 0, 0 ]), 0)
// 	vec2Equal(t, C.point2point([ 0, 0 ], [ 1, 0 ]), 1)
// 	vec2Equal(t, C.point2point([ 1, 0 ], [ -1, 0 ]), 2)
// 	vec2Equal(t, C.point2point([ -1, 0 ], [ 1, 0 ]), 2)
// 	vec2Equal(t, C.point2point([ 3, 0 ], [ 0, 4 ]), 5)
// })

// test("geometry.closest.point2circle", (t) => {
// 	vec2Equal(t, C.point2circle([ 0, 0 ], 0), 0)
// 	vec2Equal(t, C.point2circle([ 0, 0 ], 1), -1)
// 	vec2Equal(t, C.point2circle([ 0, 0 ], 3), -3)
// 	vec2Equal(t, C.point2circle([ 1, 1 ], 0), Math.sqrt(2))
// 	vec2Equal(t, C.point2circle([ -1, -1 ], 1), Math.sqrt(2) - 1)
// 	vec2Equal(t, C.point2circle([ 1, 0 ], 1), 0)
// 	vec2Equal(t, C.point2circle([ 0, 1 ], 1), 0)
// 	vec2Equal(t, C.point2circle([ 1, 0 ], 3), -2)
// 	vec2Equal(t, C.point2circle([ -1, 0 ], 3), -2)
// })

// test("geometry.closest.point2line", (t) => {
// 	vec2Equal(t, C.point2line([ 0, 0 ], [ -1, 0 ], [ 1, 0 ]), 0)
// 	vec2Equal(t, C.point2line([ 0, 0 ], [ 1, 0 ], [ -1, 0 ]), 0)
// 	vec2Equal(t, C.point2line([ 4, 0 ], [ 1, 0 ], [ -1, 0 ]), 0)
// 	vec2Equal(t, C.point2line([ 0, 4 ], [ 1, 0 ], [ -1, 0 ]), 4)
// 	vec2Equal(t, C.point2line([ 0, -4 ], [ 1, 0 ], [ -1, 0 ]), 4)
// 	vec2Equal(t, C.point2line([ 0, 0 ], [ 2, 0 ], [ 0, 2 ]), Math.sqrt(2))
// 	vec2Equal(t, C.point2line([ 0, 0 ], [ -2, 0 ], [ 0, -2 ]), Math.sqrt(2))
// })

// test("geometry.closest.point2segment", (t) => {
// 	vec2Equal(t, C.point2segment([ 0, 0 ], [ -1, 0 ], [ 1, 0 ]), 0)
// 	vec2Equal(t, C.point2segment([ 0, 0 ], [ 1, 0 ], [ -1, 0 ]), 0)
// 	vec2Equal(t, C.point2segment([ 4, 0 ], [ 1, 0 ], [ -1, 0 ]), 3)
// 	vec2Equal(t, C.point2segment([ -4, 0 ], [ 1, 0 ], [ -1, 0 ]), 3)
// 	vec2Equal(t, C.point2segment([ 0, 4 ], [ 1, 0 ], [ -1, 0 ]), 4)
// 	vec2Equal(t, C.point2segment([ 0, -4 ], [ 1, 0 ], [ -1, 0 ]), 4)
// 	vec2Equal(t, C.point2segment([ 2, 1 ], [ 1, 0 ], [ -1, 0 ]), Math.sqrt(2))
// 	vec2Equal(t, C.point2segment([ -2, 1 ], [ 1, 0 ], [ -1, 0 ]), Math.sqrt(2))
// 	vec2Equal(t, C.point2segment([ 0, 0 ], [ 2, 0 ], [ 0, 2 ]), Math.sqrt(2))
// 	vec2Equal(t, C.point2segment([ 0, 0 ], [ -2, 0 ], [ 0, -2 ]), Math.sqrt(2))
// })

// test("geometry.closest.point2box", (t) => {
// 	vec2Equal(t, C.point2box([ 0, 0 ], 0, 0), 0)
// 	vec2Equal(t, C.point2box([ 0, 0 ], 2, 2), -1)
// 	vec2Equal(t, C.point2box([ 0, 0 ], 2, 3), -1)
// 	vec2Equal(t, C.point2box([ 0, 0 ], 3, 2), -1)
// 	vec2Equal(t, C.point2box([ 1, 0 ], 3, 3), -0.5)
// 	vec2Equal(t, C.point2box([ 0, 1 ], 3, 3), -0.5)
// 	vec2Equal(t, C.point2box([ -1, 0 ], 3, 3), -0.5)
// 	vec2Equal(t, C.point2box([ 0, -1 ], 3, 3), -0.5)
// 	vec2Equal(t, C.point2box([ 1, 0 ], 2, 2), 0)
// 	vec2Equal(t, C.point2box([ 0, 1 ], 2, 2), 0)
// 	vec2Equal(t, C.point2box([ -1, 0 ], 2, 2), 0)
// 	vec2Equal(t, C.point2box([ 0, -1 ], 2, 2), 0)
// 	vec2Equal(t, C.point2box([ 1, 1 ], 2, 2), 0)
// 	vec2Equal(t, C.point2box([ -1, 1 ], 2, 2), 0)
// 	vec2Equal(t, C.point2box([ 1, -1 ], 2, 2), 0)
// 	vec2Equal(t, C.point2box([ -1, -1 ], 2, 2), 0)
// 	vec2Equal(t, C.point2box([ 2, 0 ], 2, 3), 1)
// 	vec2Equal(t, C.point2box([ 0, -2 ], 2, 3), 0.5)
// 	vec2Equal(t, C.point2box([ -2, -2.5 ], 2, 3), Math.sqrt(2))
// })

// /* eslint-disable array-element-newline */
// const polygon = [
// 	0, 0,
// 	0, 2,
// 	1, 2,
// 	1, 1,
// 	2, 1,
// 	2, 0,
// ]
// /* eslint-enable array-element-newline */

// test("geometry.closest.point2polygon", (t) => {
// 	vec2Equal(t, C.point2polygon([ 0, 0 ], polygon), 0)
// 	vec2Equal(t, C.point2polygon([ 0, 1 ], polygon), 0)
// 	vec2Equal(t, C.point2polygon([ 0, 2 ], polygon), 0)
// 	vec2Equal(t, C.point2polygon([ 0, 3 ], polygon), 1)
// 	vec2Equal(t, C.point2polygon([ -1, 3 ], polygon), Math.sqrt(2))
// 	vec2Equal(t, C.point2polygon([ -1, -1 ], polygon), Math.sqrt(2))
// 	vec2Equal(t, C.point2polygon([ 2, 2 ], polygon), 1)
// 	vec2Equal(t, C.point2polygon([ 1, 0.5 ], polygon), -0.5)
// 	vec2Equal(t, C.point2polygon([ 0.5, 1.5 ], polygon), -0.5)
// })
