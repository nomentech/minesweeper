import { createContext, ReactNode, useContext } from 'react'
import { useImmerReducer } from 'use-immer'
import {
  Cell,
  generateBoard,
  revealCell,
  revealNeighbors,
  toggleFlag,
} from './minesweeper'

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
