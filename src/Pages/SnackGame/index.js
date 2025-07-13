import React, { useEffect, useState } from "react"
import "./SnackGame.scss"

const BOARD_WIDTH = 10
const BOARD_HEIGHT = 10
const MAP_ELEMENTS = {
	0: "ground",
	1: "snack",
	2: "food",
	ground: 0,
	snack: 1,
	food: 2,
}

const Direction = {
	UP: "UP",
	DOWN: "DOWN",
	RIGHT: "RIGHT",
	LEFT: "LEFT",
}

const SnackGame = () => {
	const defaultBoard = new Array(BOARD_HEIGHT)
		.fill(0)
		.map((row) => new Array(BOARD_WIDTH).fill(0))
	const defaultSnackLocation = {
		row: Math.floor(BOARD_HEIGHT / 2),
		col: Math.floor(BOARD_WIDTH / 2),
	}
	defaultBoard[defaultSnackLocation.row][defaultSnackLocation.col] =
		MAP_ELEMENTS.snack
	defaultBoard[defaultSnackLocation.row][defaultSnackLocation.col + 2] =
		MAP_ELEMENTS.food

	const [board, setBoard] = useState(defaultBoard)
	const [snackLocation, setSnackLocation] = useState(defaultSnackLocation)
	const [direction, setDirection] = useState(null)
	const [score, setScore] = useState(0)
	const [snackBody, setSnackBody] = useState([defaultSnackLocation])
    const [isIntervalRunning, setIsIntervalRunning] = useState(false)

    const stopGame = () => {
        setIsIntervalRunning(() => false)
        setDirection(() => null)
    }

    const isNotOppositeDirection = (newDirection, direction) => {
        if (!direction) return true
        switch (newDirection) {
            case Direction.UP:
				if (direction === Direction.DOWN) return false
                break;
			case Direction.DOWN:
				if (direction === Direction.UP) return false
                break;
			case Direction.LEFT:
				if (direction === Direction.RIGHT) return false
                break;
			case Direction.RIGHT:
				if (direction === Direction.LEFT) return false
                break;
			default:
				return true
        }
    }

    const gameOver = () => {
        setBoard(() => defaultBoard)
        setSnackBody(() => [defaultSnackLocation])
        setScore(() => 0)
        setIsIntervalRunning(() => false)
        setDirection(() => null)
    }

    const generateNewFood = (newBoard) => {
        let regenerate = true
        const row = newBoard.length
        const col = newBoard[0].length

        while (regenerate) {
            const randomRow = Math.floor(Math.random() * row)
            const randomCol = Math.floor(Math.random() * col)
            if (newBoard[randomRow][randomCol] !== MAP_ELEMENTS.snack) {
                newBoard[randomRow][randomCol] = MAP_ELEMENTS.food
                regenerate = false
            }
        }
    }

	const generateNewMap = (direction, board, snackLocation, snackBody) => {
		if (!direction) return

		const newBoard = [...board]
		const newSnackBody = snackBody || []
		const { row, col } = snackLocation
		const newLocation = { row, col }

		switch (direction) {
			case Direction.UP:
				newLocation.row = row - 1 < 0 ? BOARD_HEIGHT - 1 : row - 1
				break
			case Direction.DOWN:
				newLocation.row = row + 1 > BOARD_HEIGHT - 1 ? 0 : row + 1
				break
			case Direction.LEFT:
				newLocation.col = col - 1 < 0 ? BOARD_WIDTH - 1 : col - 1
				break
			case Direction.RIGHT:
				newLocation.col = col + 1 > BOARD_WIDTH - 1 ? 0 : col + 1
				break
			default:
				break
		}

		newSnackBody.unshift(newLocation)

		const newLocationElement = newBoard[newLocation.row][newLocation.col]
		newBoard[newLocation.row][newLocation.col] = MAP_ELEMENTS.snack

        if (newLocationElement === MAP_ELEMENTS.ground) {
			const tail = newSnackBody.pop()
			newBoard[tail.row][tail.col] = MAP_ELEMENTS.ground
		} else if (newLocationElement === MAP_ELEMENTS.food) {
            setScore(oldScore => oldScore + 1)
            generateNewFood(newBoard)
        } else if (newLocationElement === MAP_ELEMENTS.snack) {
            gameOver()
            return
        }

        setSnackLocation(newLocation)
		setBoard(newBoard)
		setSnackBody(newSnackBody)
	}

    useEffect(() => {
        window.addEventListener("keydown", (e) => {
			const newDirection = getDirectionFromKey(e.key)
            setDirection(newDirection)
            // if (direction === null) setDirection(newDirection)
			// else if (isNotOppositeDirection(newDirection, direction)) {
			// 	setDirection(newDirection)
			// }
		})
    }, [])

	useEffect(() => {
        let intervalId;
        const intervalDelay = 200

        if (isIntervalRunning && direction !== null) {
            intervalId = setInterval(() => {
                generateNewMap(direction, board, snackLocation, snackBody)
            }, intervalDelay);
        }

		return () => clearInterval(intervalId);
	}, [board, snackLocation, isIntervalRunning, direction])

	useEffect(() => {
		setIsIntervalRunning(() => true)
	}, [direction])

	return (
		<div className="snack-game">
			{`Score (${score})`}
			<div className="board">
				{board.map((row, rowIndex) => (
					<div key={rowIndex} className="board-row">
						{" "}
						{row.map((cell, cellIndex) => (
							<div
								key={cellIndex}
								className={`${MAP_ELEMENTS[cell]}-cell`}
							></div>
						))}
					</div>
				))}
			</div>
			<button onClick={() => stopGame()}>{`${direction !== null ? 'Stop' : 'Stopped'}`}</button>
		</div>
	)
}

const getDirectionFromKey = (key) => {
	switch (key) {
		case "w":
			return Direction.UP
		case "s":
			return Direction.DOWN
		case "a":
			return Direction.LEFT
		case "d":
			return Direction.RIGHT
		default:
			return null
	}
}

export default SnackGame
