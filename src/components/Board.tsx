import { useState } from 'react'
import Square from './Sqaure'
import { useBoard, useBoardDispatch } from '../context/BoardContext'

export default function Board() {
  const board = useBoard()
  const dispatch = useBoardDispatch()

  const [isFirstClick, setIsFirstClick] = useState(true)

  function handleClick(x: number, y: number) {
    if (isFirstClick) {
      dispatch({ type: 'firstClick', cell: { x, y } })
      setIsFirstClick(false)
    }

    if (!board[x][y].isRevealed && !board[x][y].isFlag) {
      dispatch({ type: 'leftClick', cell: { x, y } })
    }
  }

  function handleRightClick(x: number, y: number) {
    if (!board[x][y].isRevealed || board[x][y].isFlag) {
      dispatch({ type: 'rightClick', cell: { x, y } })
    }
  }

  function handleDoubleClick(x: number, y: number) {
    if (board[x][y].isRevealed && board[x][y].mineCount !== 0) {
      dispatch({ type: 'doubleClick', cell: { x, y } })
    }
  }

  return (
    <div>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', flexDirection: 'row' }}>
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