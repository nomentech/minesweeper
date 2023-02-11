import Square from './Sqaure'
import { useBoard, useBoardDispatch } from '../context/BoardContext'

export default function GameBoard({
  setStartTimer,
}: {
  setStartTimer: Function
}) {
  const board = useBoard()
  const field = board.field
  const dispatch = useBoardDispatch()

  function handleClick(x: number, y: number) {
    if (board.isEmpty) {
      setStartTimer(true)
      dispatch({ type: 'createBoard', payload: { board, x, y } })
    }

    if (!field[x][y].isRevealed && !field[x][y].isFlag) {
      dispatch({ type: 'leftClick', payload: { x, y } })
    }
  }

  function handleRightClick(x: number, y: number) {
    if (!field[x][y].isRevealed || field[x][y].isFlag) {
      dispatch({ type: 'rightClick', payload: { x, y } })
    }
  }

  function handleDoubleClick(x: number, y: number) {
    if (field[x][y].isRevealed && field[x][y].mineCount !== 0) {
      dispatch({ type: 'doubleClick', payload: { x, y } })
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
