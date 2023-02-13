import { Board, Cell } from "./types"

export function getNeighbors(board: Board, x: number, y: number) {
  const neighbors = []

  for (let i = x - 1; i < x + 2; i++) {
    if (i < 0 || i >= board.height) continue
    for (let j = y - 1; j < y + 2; j++) {
      if (j < 0 || j >= board.width) continue
      if (i !== x || j !== y) {
        neighbors.push([i, j])
      }
    }
  }

  return neighbors
}

export function countNeighborFlag(field: Cell[][], neighbors: number[][]) {
  let count = 0
  neighbors.forEach((neighbor) => {
    const i = neighbor[0]
    const j = neighbor[1]
    if (field[i][j].isFlag) count++
  })

  return count
}