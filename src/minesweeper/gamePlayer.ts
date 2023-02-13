import { Board, Cell } from './types'
import { countNeighborFlag, getNeighbors } from './helpers'

function revealNeighbors(board: Board, x: number, y: number) {
  const field = board.field

  if (!field[x][y].isRevealed) return
  if (field[x][y].mineCount === 0) return

  const neighbors = getNeighbors(board, x, y)
  const flagCount = countNeighborFlag(field, neighbors)
  const mineCount = field[x][y].mineCount

  if (mineCount !== flagCount) return

  neighbors.forEach((neighbor) => {
    const i = neighbor[0]
    const j = neighbor[1]
    if (!field[i][j].isMine && field[i][j].isFlag) {
      revealAll(board)
    }
    revealCell(board, i, j)
  })
}

function revealCell(board: Board, x: number, y: number) {
  const field = board.field

  if (field[x][y].isFlag) return
  if (field[x][y].isRevealed) return
  // Above checks had been handled on UI level, here just double check
  
  if (field[x][y].isMine) {
    field[x][y].isDetonated = true
    revealAll(board)
    return
  }

  // Reveal Single Cell, check if winning
  // If cell is empty, run empty cell algorithm
  reveal(board, x, y)
  if (isWinning(board)) return

  if (field[x][y].mineCount === 0) {
    revealEmptyCell(board, x, y)
  }
}

// Recusively reveal neighbors of the empty cell till none is found
function revealEmptyCell(board: Board, x: number, y: number) {
  const field = board.field
  const neighbors = getNeighbors(board, x, y)

  for (let index = 0; index < neighbors.length; index++) {
    const i = neighbors[index][0]
    const j = neighbors[index][1]

    // If neighbor already revealed, ignore
    if (field[i][j].isRevealed) continue

    reveal(board, i, j)
    if (isWinning(board)) return

    field[i][j].isFlag = false // Remove flag if it is placed on the neighbor
    if (field[i][j].mineCount === 0) {
      revealEmptyCell(board, i, j)
    }
  }
}

function toggleFlag(board: Board, x: number, y: number) {
  const field = board.field

  // Revealed cell cannot place flag
  if (field[x][y].isRevealed) return

  if (!field[x][y].isFlag) {
    field[x][y].isFlag = true
    board.flags++
  } else {
    field[x][y].isFlag = false
    board.flags--
  }
}

function reveal(board: Board, x: number, y: number) {
  const field = board.field
  field[x][y].isRevealed = true
  board.unrevealed--
}

function isWinning(board: Board) {
  if (board.unrevealed > board.mines) {
    return false
  }

  board.isWon = true
  board.isPlaying = false
  flagAll(board)

  return true
}

// Flag rest of the unrevealed cell when win
function flagAll(board: Board) {
  const field = board.field

  field.forEach((row) =>
    row.forEach((col) => {
      if (!col.isRevealed && !col.isFlag) {
        col.isFlag = true
        board.flags++
      }
    })
  )
}

function revealAll(board: Board) {
  const field = board.field

  field.forEach((row) =>
    row.forEach((col) => {
      col.isRevealed = true
    })
  )

  board.isPlaying = false
  board.isWon = false
}

export { revealCell, revealNeighbors, toggleFlag}