import { Cell } from "./types"
import { getNeighbors } from "./utils"

const height = 16
const width = 30
const mines = 99

function createBoard(board: Cell[][], x: number, y: number) {
  // const emptyBoard = createEmptyBoard()
  const boardWithMines = plantMines(board, x, y)
  const finalBoard = calculateMines(boardWithMines)

  return finalBoard
}

function createEmptyBoard() {
  const board: Cell[][] = []
  for (let i = 0; i < height; i++) {
    board[i] = []
    for (let j = 0; j < width; j++) {
      board[i][j] = {
        isMine: false,
        isFlag: false,
        isRevealed: false,
        mineCount: 0
      }
    }
  }

  return board
}

function plantMines(board: Cell[][], x: number, y: number) {
  let mineCount = 0

  while (mineCount < mines) {
    const i = Math.floor(Math.random() * height)
    const j = Math.floor(Math.random() * width)

    if (!board[i][j].isMine && i !== x && j !== y) {
      board[i][j].isMine = true
      mineCount++
    }
  }

  return board
}

function calculateMines(board: Cell[][]) {
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (!board[i][j].isMine) {
        board[i][j].mineCount = countMines(i, j, board)
      }
    }
  }

  return board
}

function countMines(row: number, col: number, board: Cell[][]) {
  let count = 0
  const neighbors = getNeighbors(board, row, col)

  neighbors.forEach(neighbor => {
    const i = neighbor[0]
    const j = neighbor[1]
    if (board[i][j].isMine) count++
  })

  return count
}

export { createBoard, createEmptyBoard }