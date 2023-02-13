import { useBoard, useBoardDispatch } from '../context/BoardContext'
import { BOARD_LIST } from '../minesweeper/boardList'
import { Board } from '../minesweeper/types'

export default function Header() {
  const current = useBoard()
  const boardDispatch = useBoardDispatch()

  function handleClick(selected: Board) {
    if (!isSame(current, selected)) {
      boardDispatch({ type: 'reset_board', payload: { board: selected } })
    }
  }

  function isSame(current: Board, selected: Board) {
    return current.level === selected.level
  }

  return (
    <div className="header">
      {BOARD_LIST.map((board) => (
        <div
          key={board.level}
          onClick={() => handleClick(board)}
          className={`${isSame(current, board) && 'selected'}`}
        >
          {board.level}
        </div>
      ))}
    </div>
  )
}
