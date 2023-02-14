import { createContext, ReactNode, useContext } from 'react'
import { useImmerReducer } from 'use-immer'

import { createMineField } from '../minesweeper/boardCreator'
import { BOARD_LIST } from '../minesweeper/boardList'
import { Board } from '../minesweeper/types'
import {
  revealCell,
  revealNeighbors,
  toggleFlag,
} from '../minesweeper/gamePlayer'
import { Action, ActionType } from './actionType'

const initialBoard = BOARD_LIST[0]
const BoardContext = createContext<Board>(initialBoard)
const BoardDispatchContext = createContext<React.Dispatch<Action>>(() => null)

export function BoardProvider({ children }: { children: ReactNode }) {
  const [board, dispatch] = useImmerReducer<Board, Action>(
    boardReducer,
    initialBoard
  )

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

function boardReducer(draft: Board, action: Action): Board {
  const { type, payload } = action

  switch (type) {
    case ActionType.reset_board:
      return payload.board

    case ActionType.create_mine_field:
      createMineField(draft, payload.x, payload.y)
      break

    case ActionType.reveal_cell:
      revealCell(draft, payload.x, payload.y)
      break

    case ActionType.toggle_flag:
      toggleFlag(draft, payload.x, payload.y)
      break

    case ActionType.reveal_neighbors:
      revealNeighbors(draft, payload.x, payload.y)
      break

    default:
      throw Error('Unknown action: ' + type)
  }

  return draft
}
