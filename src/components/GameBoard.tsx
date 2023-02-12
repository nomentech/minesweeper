import Square from './Sqaure'
import { useBoard, useBoardDispatch } from '../context/BoardContext'

export default function GameBoard({
  setStartTimer,
  setDetonated,
}: {
  setStartTimer: Function
  setDetonated: Function
}) {
  const board = useBoard()
  const field = board.field
  const boardDispatch = useBoardDispatch()

  function handleClick(x: number, y: number) {
    if (board.isEmpty) {
      setStartTimer(true)
      boardDispatch({ type: 'create_mine_field', payload: { board, x, y } })
    }

    if (field[x][y].isMine) {
      boardDispatch({ type: 'reveal_all' })
      return
    }

    if (!field[x][y].isRevealed && !field[x][y].isFlag) {
      boardDispatch({ type: 'reveal_cell', payload: { x, y } })
    }
  }

  function handleRightClick(x: number, y: number) {
    if (!field[x][y].isRevealed) {
      boardDispatch({ type: 'toggle_flag', payload: { x, y } })
    }
  }

  function handleDoubleClick(x: number, y: number) {
    if (field[x][y].isRevealed && field[x][y].mineCount !== 0) {
      boardDispatch({ type: 'reveal_neighbors', payload: { x, y } })
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
