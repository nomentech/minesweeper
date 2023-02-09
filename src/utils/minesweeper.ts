import produce from "immer"
import { Cell } from "./boardGenerator"

function revealAll(board: Cell[][]) {
  return produce(board, draft =>
    draft.forEach((row) =>
      row.forEach((col) => {
        col.isRevealed = true
      })
    )
  )
}

function revealEmptyCell(board: Cell[][], x: number, y: number) {
  const neighbors = getNeighbors(board, x, y)

  for (let index=0; index < neighbors.length; index++) {
    const i = neighbors[index][0]
    const j = neighbors[index][1]
    if (board[i][j].isRevealed) continue

    board[i][j].isRevealed = true
    if (board[i][j].mineCount === 0) {
      revealEmptyCell(board, i, j)
    }
  }
}

export function revealCell(board: Cell[][], x: number, y: number) {
  if (board[x][y].isMine) return revealAll(board)

  return produce(board, draft => {
    draft[x][y].isRevealed = true

    if (draft[x][y].mineCount === 0) {
      revealEmptyCell(draft, x, y)
    }
  })
}

export function placeFlag(board: Cell[][], x: number, y: number) {
  return produce(board, draft => {
    draft[x][y].isFlag = true
    draft[x][y].isRevealed = true
  })
}

export function getNeighbors(board: Cell[][], x: number, y: number) {
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