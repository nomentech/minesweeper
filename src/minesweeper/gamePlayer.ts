import { Board, Cell } from './types'
import { countNeighborFlag, getNeighbors } from './utils'

function revealNeighbors(field: Cell[][], x: number, y: number) {
  if (!field[x][y].isRevealed) return
  if (field[x][y].mineCount === 0) return

  const neighbors = getNeighbors(field, x, y)
  const flagCount = countNeighborFlag(field, neighbors)
  const mineCount = field[x][y].mineCount

  if (mineCount !== flagCount) return

  neighbors.forEach((neighbor) => {
    const i = neighbor[0]
    const j = neighbor[1]
    if (!field[i][j].isMine && field[i][j].isFlag) {
      revealAll(field)
    }
    revealCell(field, i, j)
  })
}

function revealCell(field: Cell[][], x: number, y: number) {
  if (field[x][y].isFlag) return
  if (field[x][y].isRevealed) return
  if (field[x][y].isMine) return
  // Above checks had been handled on UI level, here just double check

  // Reveal Single Cell
  // If cell is empty, run empty cell algorithm
  field[x][y].isRevealed = true
  if (field[x][y].mineCount === 0) {
    revealEmptyCell(field, x, y)
  }
}

// Recusively reveal neighbors of the empty cell till none is found
function revealEmptyCell(field: Cell[][], x: number, y: number) {
  const neighbors = getNeighbors(field, x, y)

  for (let index = 0; index < neighbors.length; index++) {
    const i = neighbors[index][0]
    const j = neighbors[index][1]

    // If neighbor already revealed, ignore
    if (field[i][j].isRevealed) continue

    field[i][j].isRevealed = true
    field[i][j].isFlag = false // Remove flag if it is placed on the neighbor
    if (field[i][j].mineCount === 0) {
      revealEmptyCell(field, i, j)
    }
  }
}

function toggleFlag(board: Board, x: number, y: number) {
  const field = board.field

  // Revealed cell cannot place flag
  if (field[x][y].isRevealed) return

  if (!field[x][y].isFlag) {
    field[x][y].isFlag = true
    // board.mines--
  } else {
    field[x][y].isFlag = false
    // board.mines++
  }
}

function revealAll(field: Cell[][]) {
  field.forEach((row) =>
    row.forEach((col) => {
      col.isRevealed = true
    })
  )
}

export { revealCell, revealAll, revealNeighbors, toggleFlag}