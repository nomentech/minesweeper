import { createContext, ReactNode, useContext } from 'react'
import { useImmerReducer } from 'use-immer'

import { createEmptyBoard, createBoard } from '../minesweeper/boardCreator'
import {
  revealCell,
  revealNeighbors,
  toggleFlag,
} from '../minesweeper/gamePlayer'
import { Cell } from '../minesweeper/types'

const emptyBoard = createEmptyBoard()
const BoardContext = createContext<Cell[][]>(emptyBoard)
const BoardDispatchContext = createContext<React.Dispatch<any>>(() => null)

export function BoardProvider({ children }: { children: ReactNode }) {
  const [board, dispatch] = useImmerReducer(boardReducer, emptyBoard)

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
    case 'firstClick':
      createBoard(draft, cell.x, cell.y)
      break

    case 'leftClick':
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
