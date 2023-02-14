import Square from './Sqaure'
import { useBoard, useBoardDispatch } from '../context/BoardContext'
import { ActionType } from '../context/actionType'

export default function GameBoard() {
  const board = useBoard()
  const field = board.field
  const boardDispatch = useBoardDispatch()

  function handleClick(x: number, y: number) {
    if (board.isEmpty) {
      boardDispatch({
        type: ActionType.create_mine_field,
        payload: { board, x, y },
      })
    }

    if (!field[x][y].isRevealed && !field[x][y].isFlag) {
      boardDispatch({ type: ActionType.reveal_cell, payload: { x, y } })
    }
  }

  function handleRightClick(x: number, y: number) {
    if (!field[x][y].isRevealed) {
      boardDispatch({ type: ActionType.toggle_flag, payload: { x, y } })
    }
  }

  function handleDoubleClick(x: number, y: number) {
    if (field[x][y].isRevealed && field[x][y].mineCount !== 0) {
      boardDispatch({ type: ActionType.reveal_neighbors, payload: { x, y } })
    }
  }

  return (
    <div className="board">
      {board.field.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((col, colIndex) => (
            <Square
              key={colIndex}
              cell={col}
              onClick={() => handleClick(rowIndex, colIndex)}
              onRightClick={(e: React.MouseEvent) => {
                e.preventDefault()
                handleRightClick(rowIndex, colIndex)
              }}
              onDoubleClick={() => handleDoubleClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
