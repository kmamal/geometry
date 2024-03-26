

const slopeFactor = (x, y) => {
	const s = y / x
	const f = Math.sign(x)
	return y >= 0 ? s + f : -1 / (s - f)
}

module.exports = { slopeFactor }
