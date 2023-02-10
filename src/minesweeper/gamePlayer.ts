import { Cell } from './types'
import { getNeighbors } from './utils'

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

function toggleFlag(board: Cell[][], x: number, y: number) {
  if (!board[x][y].isFlag && !board[x][y].isRevealed) {
    board[x][y].isFlag = true
    board[x][y].isRevealed = true
  } else if (board[x][y].isFlag) {
    board[x][y].isFlag = false
    board[x][y].isRevealed = false
  }
}

export { revealCell, revealNeighbors, toggleFlag}