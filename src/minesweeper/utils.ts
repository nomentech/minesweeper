import { Cell } from "./types"

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

export function countNeighborFlag(field: Cell[][], neighbors: number[][]) {
  let count = 0
  neighbors.forEach((neighbor) => {
    const i = neighbor[0]
    const j = neighbor[1]
    if (field[i][j].isFlag) count++
  })

  return count
}