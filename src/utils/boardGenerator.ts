import { getNeighbors } from "./minesweeper"

const height = 10
const width = 10
const mines = 10

export interface Cell {
  isMine: boolean,
  isFlag: boolean,
  isRevealed: boolean,
  mineCount: number
}

export default function generateBoard() {
  const emptyField = createEmptyField()
  const mineField = placeMines(emptyField)
  const board = createBoard(mineField)

  return board
}

function createEmptyField() {
  const field: Cell[][] = []
  for (let i = 0; i < height; i++) {
    field[i] = []
    for (let j = 0; j < width; j++) {
      field[i][j] = {
        isMine: false,
        isFlag: false,
        isRevealed: false,
        mineCount: 0
      }
    }
  }

  return field
}

function placeMines(emptyField: Cell[][]) {
  let mineCount = 0
  const field = deepClone(emptyField)

  while (mineCount < mines) {
    const x = Math.floor(Math.random() * width)
    const y = Math.floor(Math.random() * height)

    if (!field[y][x].isMine) {
      field[y][x].isMine = true
      mineCount++
    }
  }

  return field
}

function createBoard(mineField: Cell[][]) {
  const field = deepClone(mineField)

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (!field[i][j].isMine) {
        field[i][j].mineCount = countMines(i, j, field)
      }
    }
  }

  return field
}

function countMines(row: number, col: number, field: Cell[][]) {
  let count = 0
  const neighbors = getNeighbors(field, row, col)

  neighbors.forEach(neighbor => {
    const i = neighbor[0]
    const j = neighbor[1]
    if (field[i][j].isMine) count++
  })

  return count
}

function deepClone(arr: Cell[][]): Cell[][] {
  return JSON.parse(JSON.stringify(arr))
}