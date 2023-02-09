import { useImmer } from 'use-immer'
import generateBoard from '../utils/boardGenerator'
import Square from './Sqaure'

const initBoard = generateBoard()

export default function Board() {
  const [board, updateBoard] = useImmer(initBoard)

  function revealAll() {
    updateBoard((draft) =>
      draft.forEach((row) =>
        row.forEach((col) => {
          col.isRevealed = true
        })
      )
    )
  }

  function handleClick(x: number, y: number) {
    if (board[x][y].isMine) {
      revealAll()
    } else {
      updateBoard((board) => {
        board[x][y].isRevealed = true
      })
    }
  }

  function handleRightClick(x: number, y: number) {
    updateBoard((draft) => {
      draft[x][y].isFlag = true
      draft[x][y].isRevealed = true
    })
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
