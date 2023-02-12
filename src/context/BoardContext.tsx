import { createContext, ReactNode, useContext } from 'react'
import { useImmerReducer } from 'use-immer'

import { createMineField } from '../minesweeper/boardCreator'
import { BOARD_LIST } from '../minesweeper/contants'
import { Board } from '../minesweeper/types'
import {
  revealAll,
  revealCell,
  revealNeighbors,
  toggleFlag,
} from '../minesweeper/gamePlayer'

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
    case 'change_level':
      return payload.board

    case 'create_mine_field':
      createMineField(draft, payload.x, payload.y)
      break

    case 'reveal_all':
      revealAll(draft.field)
      break

    case 'reveal_cell':
      revealCell(draft.field, payload.x, payload.y)
      break

    case 'toggle_flag':
      toggleFlag(draft, payload.x, payload.y)
      break

    case 'reveal_neighbors':
      revealNeighbors(draft.field, payload.x, payload.y)
      break

    default:
      throw Error('Unknown action: ' + action.type)
  }
}
