
import React, { useEffect, useState } from 'react'
import './Board.scss'

const BOARD_WIDTH = 10
const BOARD_HEIGHT = 10
const MAP_ELEMENTS = {
  0: 'ground',
  1: 'snack',
  2: 'food',
  ground: 0,
  snack: 1,
  food: 2
}

const Direction = {
  UP: 'UP',
  DOWN: 'DOWN',
  RIGHT: 'RIGHT',
  LEFT: 'LEFT'
}

const SnackGame = () => {
  const defaultBoard = new Array(BOARD_HEIGHT).fill(0).map(row => new Array(BOARD_WIDTH).fill(0))
  const defaultSnackLocation = {
    row: Math.floor(BOARD_HEIGHT / 2),
    col: Math.floor(BOARD_WIDTH / 2)
  }
  defaultBoard[defaultSnackLocation.row][defaultSnackLocation.col] = MAP_ELEMENTS.snack
  
  const [board, setBoard] = useState(defaultBoard)
  const [snackLocation, setSnackLocation] = useState(defaultSnackLocation)
  const [direction, setDirection] = useState("")
  const [score, setScore] = useState(0)

  const generateNewMap = (direction, board, snackLocation) => {
    if (!direction) return
    
    const newSnackLocation = {...snackLocation}
    const newBoard = [...board]

    const {row, col} = snackLocation

    let newRow = row, newCol = col
    switch (direction) {
      case Direction.UP:
        newRow = row - 1 < 0 ? BOARD_HEIGHT - 1 : row - 1
        break;
      case Direction.DOWN:
        newRow = row + 1 > BOARD_HEIGHT - 1 ? 0 : row + 1
        break;
      case Direction.LEFT:
        newCol = col - 1 < 0 ? BOARD_WIDTH - 1 : col - 1
        break;
      case Direction.RIGHT:
        newCol = col + 1 > BOARD_WIDTH - 1 ? 0 : col + 1
        break;
      default:
        break;
    }

    newBoard[row][col] = MAP_ELEMENTS.ground
    newBoard[newRow][newCol] = MAP_ELEMENTS.snack
    setBoard(newBoard)
    setSnackLocation({row: newRow, col: newCol})
  }

  useEffect(() => {
    const interval = setInterval(() => {
      generateNewMap(direction, board, snackLocation)
    }, 200)

    window.addEventListener('keydown', e => {
      const newDirection = getDirectionFromKey(e.key)
      if (newDirection !== null || newDirection !== direction) {
        setDirection(newDirection)
      }
    })

    return () => clearInterval(interval);
  }, [direction, board, snackLocation])

  useEffect(() => {
    generateNewMap(direction, board, snackLocation)
  }, [direction])
  
  return (
    <div className="snack-game">
      {score}
      {direction}
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className = "board-row"> {
            row.map((cell, cellIndex) => (<div key={cellIndex} className={`${MAP_ELEMENTS[cell]}-cell`}></div>))
          }
          </div>
        ))}
      </div>
      <button>Stop</button>
    </div>
  );
}

const getDirectionFromKey = key => {
  switch (key) {
    case 'w':
      return Direction.UP
      break;
    case 's':
      return Direction.DOWN
      break;
    case 'a':
      return Direction.LEFT
      break;
    case 'd':
      return Direction.RIGHT
      break;
    default:
      return null
      break;
  }
}

export default SnackGame