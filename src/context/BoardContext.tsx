import { createContext, ReactNode, useContext } from 'react'
import { useImmerReducer } from 'use-immer'

import { createMineField } from '../minesweeper/boardCreator'
import { BOARD_LIST } from '../minesweeper/contants'
import {
  revealCell,
  revealNeighbors,
  toggleFlag,
} from '../minesweeper/gamePlayer'
import { Board } from '../minesweeper/types'

const initialBoard = BOARD_LIST[0]
const BoardContext = createContext<Board>(initialBoard)
const BoardDispatchContext = createContext<React.Dispatch<any>>(() => null)

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

function boardReducer(draft: Board, action: any) {
  const { type, payload } = action

  switch (type) {
    case 'changeLevel':
      return payload.board

    case 'leftClick':
      if (draft.isEmpty) createMineField(draft, payload.x, payload.y)
      revealCell(draft.field, payload.x, payload.y)
      break

    case 'rightClick':
      toggleFlag(draft.field, payload.x, payload.y)
      break

    case 'doubleClick':
      revealNeighbors(draft.field, payload.x, payload.y)
      break

    default:
      throw Error('Unknown action: ' + action.type)
  }
}
