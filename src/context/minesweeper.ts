const height = 10
const width = 10
const mines = 10

export interface Cell {
  isMine: boolean,
  isFlag: boolean,
  isRevealed: boolean,
  mineCount: number
}

function generateBoard() {
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

//

function revealNeighbors(board: Cell[][], x: number, y: number) {
  const neighbors = getNeighbors(board, x, y)
  const flagCount = countNeighborFlag(board, neighbors)
  const mineCount = board[x][y].mineCount

  if (mineCount !== flagCount) return board

  neighbors.forEach((neighbor) => {
    const i = neighbor[0]
    const j = neighbor[1]
    if (!board[i][j].isMine && board[i][j].isFlag) {
      revealAll(board)
    }
    revealCell(board, i, j)
  })
}

function countNeighborFlag(board: Cell[][], neighbors: number[][]) {
  let count = 0
  neighbors.forEach((neighbor) => {
    const i = neighbor[0]
    const j = neighbor[1]
    if (board[i][j].isFlag) count++
  })

  return count
}

function revealCell(board: Cell[][], x: number, y: number) {
  if (board[x][y].isMine && !board[x][y].isFlag) {
    revealAll(board)
  }

  board[x][y].isRevealed = true

  if (board[x][y].mineCount === 0) {
    revealEmptyCell(board, x, y)
  }
}

function revealAll(board: Cell[][]) {
  board.forEach((row) =>
    row.forEach((col) => {
      col.isRevealed = true
    })
  )
}

function revealEmptyCell(board: Cell[][], x: number, y: number) {
  const neighbors = getNeighbors(board, x, y)

  for (let index = 0; index < neighbors.length; index++) {
    const i = neighbors[index][0]
    const j = neighbors[index][1]
    if (board[i][j].isRevealed) continue

    board[i][j].isRevealed = true
    if (board[i][j].mineCount === 0) {
      revealEmptyCell(board, i, j)
    }
  }
}

function getNeighbors(board: Cell[][], x: number, y: number) {
  const height = board.length
  const width = board[0].length
  const neighbors = []

  for (let i = x - 1; i < x + 2; i++) {
    if (i < 0 || i >= height) continue
    for (let j = y - 1; j < y + 2; j++) {
      if (j < 0 || j >= width) continue
      if (i !== x || j !== y) {
        neighbors.push([i, j])
      }
    }
  }

  return neighbors
}

function toggleFlag(board: Cell[][], x: number, y: number) {
  if (!board[x][y].isFlag && !board[x][y].isRevealed) {
    board[x][y].isFlag = true
    board[x][y].isRevealed = true
  } else if (board[x][y].isFlag) {
    board[x][y].isFlag = false
    board[x][y].isRevealed = false
  }
}

export { generateBoard, revealCell, revealNeighbors, toggleFlag}