import { Board, Cell } from "./types"
import { getNeighbors } from "./helpers"

function createEmptyField(width: number, height: number) {
  const field: Cell[][] = [] 
  for (let i = 0; i < height; i++) {
    field[i] = []
    for (let j = 0; j < width; j++) {
      field[i][j] = {
        isMine: false,
        isFlag: false,
        isRevealed: false,
        isDetonated: false,
        isWrongFlag: false,
        mineCount: 0
      }
    }
  }
  
  return field
}

function createMineField(board: Board, x: number, y: number) {
  plantMines(board, x, y)
  calculateMines(board)
  board.isEmpty = false
  board.isPlaying = true
}

function plantMines(board: Board, x: number, y: number) {
  let mineCount = 0
  const field = board.field

  while (mineCount < board.mines) {
    const i = Math.floor(Math.random() * board.height)
    const j = Math.floor(Math.random() * board.width)

    if (!field[i][j].isMine && i !== x && j !== y) {
      field[i][j].isMine = true
      mineCount++
    }
  }
}

function calculateMines(board: Board) {
  const field = board.field
  for (let i = 0; i < board.height; i++) {
    for (let j = 0; j < board.width; j++) {
      if (!field[i][j].isMine) {
        field[i][j].mineCount = countMines(i, j, board)
      }
    }
  }
}

function countMines(row: number, col: number, board: Board) {
  const field = board.field
  let count = 0
  const neighbors = getNeighbors(board, row, col)

  neighbors.forEach(neighbor => {
    const i = neighbor[0]
    const j = neighbor[1]
    if (field[i][j].isMine) count++
  })

  return count
}

export { createEmptyField, createMineField }