const { memoize } = require('@kmamal/util/function/memoize')
const { point: getPoint } = require('./point')

const defineFor = memoize((Domain) => {
	const { sub, div, eq, gt, lt, fromNumber, toNumber, toString } = Domain
	const ZERO = fromNumber(0)
	const ONE = fromNumber(1)
	const V2 = require('@kmamal/linear-algebra/vec2').defineFor(Domain)

	const getPointFromMap = (map, p) => {
		const key = `${toString(p[0])}_${toString(p[1])}`
		let value = map.get(key)
		if (value === undefined) {
			value = { p, edges: new Set() }
			map.set(key, value)
		}
		return value
	}

	const { heapifyWith, popWith, addWith } = require('@kmamal/util/array/heap')
	const fnCmpEndpoints = (endpoint1, endpoint2) => {
		{
			const { point: { p: p1 } } = endpoint1
			const { point: { p: p2 } } = endpoint2

			const dpy = toNumber(sub(p2[1], p1[1]))
			if (dpy !== 0) { return dpy }

			const dpx = toNumber(sub(p1[0], p2[0]))
			if (dpx !== 0) { return dpx }

			return endpoint1.closing ? 1 : -1
		}
	}

	// TODO: use generic one
	const segmentIntersection = (a1, b1, a2, b2) => {
		const a1b1 = V2.sub(b1, a1)
		const a2b2 = V2.sub(b2, a2)
		const a2a1 = V2.sub(a1, a2)

		const det = V2.cross(a1b1, a2b2)
		if (eq(det, ZERO)) {
			return null
		}

		const t1 = div(V2.cross(a2b2, a2a1), det)
		if (lt(t1, ZERO) || lt(ONE, t1)) {
			return null
		}

		const t2 = div(V2.cross(a1b1, a2a1), det)
		if (lt(t2, ZERO) || lt(ONE, t2)) {
			return null
		}

		return { q: V2.add(a1, V2.scale(a1b1, t1)), t1, t2 }
	}

	const splitEdge = (edges, edge, point) => {
		const { beta } = edge
		const splinter = { alpha: point, beta, downward: edge.downward }
		edges.add(splinter)
		edge.beta = point

		point.edges.add(edge)
		point.edges.add(splinter)
		beta.edges.delete(edge)
		beta.edges.add(splinter)

		return splinter
	}

	const { sortBy } = require('@kmamal/util/array/sort')
	const getAngle = ({ angle }) => angle

	const makeSimple = (polygon) => {
		const { length } = polygon
		if (length <= 6) { return [ polygon ] }

		// Polygon structs
		const points = new Map()
		const edges = new Set()

		// Scanline algorithm
		const endpoints = new Array(length)

		// Polyline walk
		const simples = []
		let topEdge

		// Initialize
		{
			let a = getPoint(polygon, length - 2)
			let alpha = getPointFromMap(points, a)

			let index = 0
			while (index < length) {
				const b = getPoint(polygon, index)
				const beta = getPointFromMap(points, b)
				const edge = { alpha, beta }
				edges.add(edge)
				alpha.edges.add(edge)
				beta.edges.add(edge)

				const aEndpoint = { point: alpha, edge, other: null, closing: false }
				const bEndpoint = { point: beta, edge, other: null, closing: false }
				aEndpoint.other = bEndpoint
				bEndpoint.other = aEndpoint

				const downward = fnCmpEndpoints(aEndpoint, bEndpoint) < 0
				if (downward) {
					bEndpoint.closing = true
				} else {
					aEndpoint.closing = true
				}
				endpoints[index++] = aEndpoint
				endpoints[index++] = bEndpoint

				edge.downward = downward

				a = b
				alpha = beta
			}

			heapifyWith(endpoints, fnCmpEndpoints)
		}

		// Scanline algorithm
		{
			const active = new Set()
			while (endpoints.length > 0) {
				const endpoint1 = popWith(endpoints, fnCmpEndpoints)

				if (endpoint1.closing) {
					active.delete(endpoint1.other)
					continue
				}

				let { edge: edge1, other: other1 } = endpoint1
				const { downward: downward1 } = edge1
				let { alpha: alpha1, beta: beta1 } = edge1

				for (const endpoint2 of active.values()) {
					let { edge: edge2 } = endpoint2
					const { alpha: alpha2, beta: beta2 } = edge2

					if (false
						|| alpha1 === alpha2
						|| alpha1 === beta2
						|| beta1 === alpha2
						|| beta1 === beta2
					) { continue }

					const intersection = segmentIntersection(
						alpha1.p,
						beta1.p,
						alpha2.p,
						beta2.p,
					)
					if (!intersection) { continue }

					const { q, t1, t2 } = intersection
					const point = getPointFromMap(points, q)

					const shouldSplit1 = point !== alpha1 && point !== beta1
					const shouldSplit2 = point !== alpha2 && point !== beta2

					if (shouldSplit1) {
						let splinter = splitEdge(edges, edge1, point)
						if (downward1) {
							other1.edge = splinter
							beta1 = point
						} else {
							const tmp = edge1
							endpoint1.edge = edge1 = splinter
							splinter = tmp
							alpha1 = point
						}

						const newClose = { point, edge: edge1, other: endpoint1, closing: true }
						addWith(endpoints, newClose, fnCmpEndpoints)

						const newOpen = { point, edge: splinter, other: other1, closing: false }
						addWith(endpoints, newOpen, fnCmpEndpoints)

						endpoint1.other = other1 = newClose
					}

					if (shouldSplit2) {
						const { other: other2 } = endpoint2
						const { downward: downward2 } = edge2

						let splinter = splitEdge(edges, edge2, point)
						if (downward2) {
							other2.edge = splinter
						} else {
							const tmp = edge2
							endpoint2.edge = edge2 = splinter
							splinter = tmp
						}

						const newClose = { point, edge: edge2, other: endpoint2, closing: true }
						addWith(endpoints, newClose, fnCmpEndpoints)

						const newOpen = { point, edge: splinter, other: other2, closing: false }
						addWith(endpoints, newOpen, fnCmpEndpoints)

						endpoint2.other = newClose
					}
				}

				active.add(endpoint1)

				if (!topEdge) { topEdge = edge1 }
			}
		}

		// Sort intersections
		for (const point of points.values()) {
			const arr = Array.from(point.edges)
			point.edges = arr

			if (arr.length > 2) {
				for (const edge of arr) {
					const { alpha, beta } = edge
					const e = point === alpha
						? V2.sub(beta.p, alpha.p)
						: V2.sub(alpha.p, beta.p)
					edge.angle = -toNumber(V2.angle(e))
				}
				sortBy.$$$(arr, getAngle)
			}

			for (let i = 0; i < arr.length; i++) {
				const edge = arr[i]
				if (edge.alpha !== point) {
					edge.bIndex = i
				}
			}
		}

		for (const edge of edges.values()) {
			edge.e = V2.sub(edge.beta.p, edge.alpha.p)
		}

		// Walk polyline
		{
			let nextEdge = topEdge

			while (edges.size > 0) {
				if (!nextEdge) { nextEdge = edges.values().next().value }

				const polyline = [ nextEdge ]
				let startIndex

				{
					let edge = nextEdge

					const checkpoints = [ { point: edge.alpha, index: 0 } ]

					let beta = edge.beta

					for (;;) {
						if (beta.edges.length > 2) {
							const index = polyline.length
							checkpoints.push({ point: beta, index })
						}

						{
							const betaEdges = beta.edges
							let index = edge.bIndex

							let counter = 1
							while (counter > 0 || !edges.has(edge)) {
								index = (index + 1) % betaEdges.length
								edge = betaEdges[index]
								counter += edge.alpha === beta ? -1 : 1
							}
						}

						polyline.push(edge)

						beta = edge.beta
						let foundIndex = -1
						for (let i = 0; i < checkpoints.length; i++) {
							if (checkpoints[i].point !== beta) { continue }
							foundIndex = i
							break
						}

						if (foundIndex !== -1) {
							startIndex = checkpoints[foundIndex].index
							break
						}
					}
				}

				{
					const polylineLength = polyline.length
					let index = startIndex

					const simpleLength = (polylineLength - index) * 2
					const simple = new Array(simpleLength)
					let writeIndex = 0

					const firstEdge = polyline[index]
					let edge = firstEdge

					const start = edge.alpha
					const s = start.p
					simple[writeIndex++] = s[0]
					simple[writeIndex++] = s[1]

					const lastIndex = polylineLength - 1
					const lastEdge = polyline[lastIndex]

					let prevEdge = lastEdge
					for (;;) {
						const e = edge.e
						const pe = prevEdge.e
						if (true
							&& eq(V2.cross(e, pe), ZERO)
							&& gt(V2.dot(e, pe), ZERO)
						) {
							writeIndex -= 2
						}

						const beta = edge.beta
						const b = beta.p
						simple[writeIndex++] = b[0]
						simple[writeIndex++] = b[1]

						edges.delete(edge)

						if (index === lastIndex) { break }
						prevEdge = edge
						edge = polyline[index++]
					}

					simple.length = writeIndex

					const e = firstEdge.e
					const pe = lastEdge.e
					if (true
						&& eq(V2.cross(e, pe), ZERO)
						&& gt(V2.dot(e, pe), ZERO)
					) {
						simple.splice(0, 2)
					}
					edges.delete(lastEdge)

					simples.push(simple)
				}

				nextEdge = null
			}
		}

		return simples
	}

	return { makeSimple }
})

module.exports = { defineFor }
