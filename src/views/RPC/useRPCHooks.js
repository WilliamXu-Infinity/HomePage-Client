import { useEffect, useState, useRef } from "react"

const EACH_ICONS = 5
const REFRESH_RATE = 50
const ICON_SIZE = 15
const SPEED = 51

const useRPCHooks = () => {
	const contentRef = useRef(null)
	const [positions, setPositions] = useState([])
	const [start, setStart] = useState(false)
    const [reachToEnd, setReachToEnd] = useState(false)
	const [xRange, setXRange] = useState([])
	const [yRange, setYRange] = useState([])
	const [scores, setScores] = useState([EACH_ICONS, EACH_ICONS, EACH_ICONS]) // r p c
    const [historyScores, setHistoryScores] = useState([])

	const clickStartOrPause = () => {
        if (reachToEnd) {
            generateAllIcons()
            setReachToEnd(false)
        }
		setStart((s) => !s)
	}

    const clickReset = () => {
        setStart(false)
        generateAllIcons()
    }

	const generateAllIcons = () => {
		const positions = []

		for (let i = 0; i < EACH_ICONS * 3; i++) {
			const yv = Math.floor(Math.random() * SPEED)
			const xv = yv !== 0 ? Math.sqrt(SPEED * SPEED - yv * yv) : SPEED
			const x =
				Math.floor(Math.random() * (xRange[1] - xRange[0])) + xRange[0]
			const y =
				Math.floor(Math.random() * (yRange[1] - yRange[0])) + yRange[0]

			const types = i % 3
			let type = "c"
			if (types === 1) type = "r"
			else if (types === 2) type = "p"

			positions.push({ id: i, x, y, xv, yv, type })
		}
		setScores([EACH_ICONS, EACH_ICONS, EACH_ICONS])
		setPositions(positions)
	}

	const compareType = (newType, otherType) => {
		if (newType === otherType) return newType
		if (newType === "c") {
			if (otherType === "r") {
				setScores(([r, p, c]) => [r + 1, p, c - 1])
				return "r"
			}
		} else if (newType === "r") {
			if (otherType === "p") {
				setScores(([r, p, c]) => [r - 1, p + 1, c])
				return "p"
			}
		} else if (newType === "p") {
			if (otherType === "c") {
				setScores(([r, p, c]) => [r, p - 1, c + 1])
				return "c"
			}
		}

		return newType
	}

	const calculateNewPosition = (positions) => {
		return positions.map((position) => {
			const { id, x, y, xv, yv, type } = position
			const [minWidth, maxWidth] = xRange
			const [minHeight, maxHeight] = yRange
			let nxv = xv,
				nyv = yv,
				nx = x + xv,
				ny = y + yv,
				nType = type

			// Bouncing to each other
			positions.forEach((otherP) => {
				if (otherP.id === id) return
				const onx = otherP.x + otherP.xv
				const ony = otherP.y + otherP.yv

				const xD = Math.abs(onx - (nx + xv))
				const yD = Math.abs(ony - (ny + yv))
				const distance = Math.sqrt(xD * xD + yD * yD)
				// const distance = Math.abs(xD - yD)

				// console.log('\x1b[31m%s\x1b[0m', `WX - distance: ${distance}, ${onx}, ${nx}`)
				// console.log('\x1b[31m%s\x1b[0m', `WX - distance: ${distance} | ${ICON_SIZE}`)

				if (distance <= ICON_SIZE) {
					nxv = -nxv
					nyv = -nyv
					nType = compareType(nType, otherP.type)
				}
			})

			// Bouncing edge
			if (nx + ICON_SIZE > maxWidth || nx - ICON_SIZE < minWidth) {
				nxv = -nxv
			}

			if (ny + ICON_SIZE > maxHeight || ny - ICON_SIZE < minHeight) {
				nyv = -nyv
			}

			// nx = x + nxv
			// ny = y + nyv

			return { id, x: nx, y: ny, xv: nxv, yv: nyv, type: nType }
		})
	}

	const moveIcon = () => {
		setPositions((positions) => calculateNewPosition(positions))
	}

	const iconStyle = ({ x, y, type }) => {
		let color = "red"
		if (type === "r") color = "black"
		else if (type === "p") color = "blue"
		return { transform: `translate(${x}px, ${y}px)`, color: `${color}` }
	}

	useEffect(() => {
        let timer

		if (start) {
            timer = setInterval(() => {
				moveIcon()
			}, REFRESH_RATE)
		} else {
			clearInterval(timer)
		}

		return () => clearInterval(timer)
	}, [start])

	useEffect(() => {
		console.log("\x1b[31m%s\x1b[0m", "WX - check")
		if (contentRef.current) {
			const rect = contentRef.current.getBoundingClientRect()
			const { width, height, x, y } = rect
			// setXRange([Math.floor(x), Math.floor(width + x)])
			// setYRange([Math.floor(y), Math.floor(height + y)])
			setXRange([0, width - x])
			setYRange([0, height - y])
		}
	}, [contentRef])

    // Generate initial graph
    useEffect(() => {
        generateAllIcons()
    }, [xRange])

    // when to stop
	useEffect(() => {
		const stop = scores.some((s) => s === 0)
		if (stop) {
            setStart(false)
            setReachToEnd(true)
            setHistoryScores(hs => [...hs, [hs.length, ...scores]])
        }
	}, [scores])

	return {
		iconStyle,
		positions,
		contentRef,
		clickStartOrPause,
        clickReset,
		scores,
        historyScores,
        start
	}
}

export default useRPCHooks
