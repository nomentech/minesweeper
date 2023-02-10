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

// function countNeighborFlag(board: Cell[][], neighbors: number[][]) {
//   let count = 0
//   neighbors.forEach(neighbor => {
//     const i = neighbor[0]
//     const j = neighbor[1]
//     if (board[i][j].isFlag) count++
//   })

//   return count
// }

export function revealNeighbors(board: Cell[][], x: number, y: number) {
  // const neighbors = getNeighbors(board, x, y)
  // const flagCount = countNeighborFlag(board, neighbors)
  // const mineCount = board[x][y].mineCount

  // if (mineCount !== flagCount) return board

  // return produce(board, draft => {
  //   neighbors.forEach(neighbor => {
  //     const i = neighbor[0]
  //     const j = neighbor[1]
  //     if (!draft[i][j].isMine && draft[i][j].isFlag) {
  //       revealAll(draft)
  //     }
  //     revealCell(draft, i, j)
  //   })
  // })
}

export function toggleFlag(board: Cell[][], x: number, y: number) {
  return produce(board, draft => {
    if (!draft[x][y].isFlag && !draft[x][y].isRevealed) {
      draft[x][y].isFlag = true
      draft[x][y].isRevealed = true
    } else if (draft[x][y].isFlag) {
      draft[x][y].isFlag = false
      draft[x][y].isRevealed = false
    }
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