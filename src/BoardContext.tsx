import { createContext, ReactNode, useContext } from 'react'
import { useImmerReducer } from 'use-immer'
import generateBoard, { Cell } from './utils/boardGenerator'

const initialBoard = generateBoard()
const BoardContext = createContext<Cell[][]>(initialBoard)
const BoardDispatchContext = createContext<any>(null)

export function BoardProvider({ children }: { children: ReactNode }) {
  const [board, dispatch] = useImmerReducer(boardReducer, initialBoard)

  return (
    <BoardContext.Provider value={board}>
      <BoardDispatchContext.Provider value={dispatch}>
        {children}
      </BoardDispatchContext.Provider>
    </BoardContext.Provider>
  )
}

export function useBoard() {
  return useContext(BoardContext)
}

export function useBoardDispatch() {
  return useContext(BoardDispatchContext)
}

function boardReducer(draft: Cell[][], action: any) {
  const { type, cell } = action
  switch (type) {
    case 'click':
      revealCell(draft, cell.x, cell.y)
      break

    case 'rightClick':
      toggleFlag(draft, cell.x, cell.y)
      break

    case 'doubleClick':
      revealNeighbors(draft, cell.x, cell.y)
      break

    default:
      throw Error('Unknown action: ' + action.type)
  }
}

// move following functions to separate file after done
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
