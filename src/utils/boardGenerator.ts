const height = 16
const width = 30
const mines = 99

export interface Cell {
  isMine: boolean,
  hasFlag: boolean,
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
        hasFlag: false,
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
  for (let i = row - 1; i < row + 2; i++) {
    if (i < 0 || i >= height) continue
    for (let j = col - 1; j < col + 2; j++) {
      if (j < 0 || j >= width) continue
      if (field[i][j].isMine) count++
    }
  }
  return count
}

function deepClone(arr: Cell[][]): Cell[][] {
  return JSON.parse(JSON.stringify(arr))
}