
const pointTo = (dst, polygon, index) => {
	dst[0] = polygon[index + 0]
	dst[1] = polygon[index + 1]
}

const point = (polygon, index) => [
	polygon[index + 0],
	polygon[index + 1],
]

point.to = pointTo

module.exports = { point }
