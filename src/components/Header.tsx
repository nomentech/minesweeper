import { useBoard, useBoardDispatch } from '../context/BoardContext'
import { BOARD_LIST } from '../minesweeper/boardList'
import { ActionType } from '../context/actionType'
import { Board } from '../minesweeper/types'

export default function Header() {
  const current = useBoard()
  const boardDispatch = useBoardDispatch()

  function handleClick(selected: Board) {
    if (!isSame(current, selected)) {
      boardDispatch({
        type: ActionType.reset_board,
        payload: { board: selected },
      })
    }
  }

  return (
    <div className='header'>
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

function isSame(current: Board, selected: Board) {
  return current.level === selected.level
}
