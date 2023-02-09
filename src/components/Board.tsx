import { useState } from 'react'
import Square from './Sqaure'
import generateBoard from '../utils/boardGenerator'
import { placeFlag, revealCell } from '../utils/minesweeper'

const initBoard = generateBoard()

export default function Board() {
  const [board, setBoard] = useState(initBoard)

  function handleClick(x: number, y: number) {
    if (!board[x][y].isRevealed && !board[x][y].isFlag) {
      setBoard((board) => revealCell(board, x, y))
    }
  }

  function handleRightClick(x: number, y: number) {
    if (!board[x][y].isRevealed) {
      setBoard((board) => placeFlag(board, x, y))
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
            />
          ))}
        </div>
      ))}
    </div>
  )
}
