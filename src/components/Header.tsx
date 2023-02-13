import { useBoardDispatch } from '../context/BoardContext'
import { BOARD_LIST } from '../minesweeper/contants'
import { Board } from '../minesweeper/types'

export default function Header() {
  const boardDispatch = useBoardDispatch()

  function handleClick(board: Board) {
    boardDispatch({ type: 'reset_board', payload: { board } })
  }

  return (
    <div className="header">
      {BOARD_LIST.map((board) => (
        <div key={board.level} onClick={() => handleClick(board)}>
          {board.level}
        </div>
      ))}
    </div>
  )
}
