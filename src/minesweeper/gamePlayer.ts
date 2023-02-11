import { Cell } from './types'
import { getNeighbors } from './utils'

function revealNeighbors(field: Cell[][], x: number, y: number) {
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

function countNeighborFlag(field: Cell[][], neighbors: number[][]) {
  let count = 0
  neighbors.forEach((neighbor) => {
    const i = neighbor[0]
    const j = neighbor[1]
    if (field[i][j].isFlag) count++
  })

  return count
}

function revealCell(field: Cell[][], x: number, y: number) {
  if (field[x][y].isMine && !field[x][y].isFlag) {
    revealAll(field)
  }

  field[x][y].isRevealed = true

  if (field[x][y].mineCount === 0) {
    revealEmptyCell(field, x, y)
  }
}

function revealAll(field: Cell[][]) {
  field.forEach((row) =>
    row.forEach((col) => {
      col.isRevealed = true
    })
  )
}

function revealEmptyCell(field: Cell[][], x: number, y: number) {
  const neighbors = getNeighbors(field, x, y)

  for (let index = 0; index < neighbors.length; index++) {
    const i = neighbors[index][0]
    const j = neighbors[index][1]
    if (field[i][j].isRevealed || field[i][j].isFlag || field[i][j].isMine) continue

    field[i][j].isRevealed = true
    if (field[i][j].mineCount === 0 && !field[i][j].isFlag && !field[i][j].isMine) {
      revealEmptyCell(field, i, j)
    }
  }
}

function toggleFlag(field: Cell[][], x: number, y: number) {
  if (!field[x][y].isFlag && !field[x][y].isRevealed) {
    field[x][y].isFlag = true
    field[x][y].isRevealed = true
  } else if (field[x][y].isFlag) {
    field[x][y].isFlag = false
    field[x][y].isRevealed = false
  }
}

export { revealCell, revealNeighbors, toggleFlag}