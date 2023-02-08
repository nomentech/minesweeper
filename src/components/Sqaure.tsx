import { useState } from 'react'
import { Cell } from '../utils/boardGenerator'

export default function Square({ initCell }: { initCell: Cell }) {
  const [cell, setCell] = useState(initCell)

  function handleClick() {
    setCell((cell) => ({ ...cell, isRevealed: true }))
  }

  return (
    <div
      onClick={handleClick}
      style={{
        width: 20,
        height: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
      }}
    >
      {cell.isRevealed ? (cell.isMine ? 'M' : cell.mineCount) : ''}
    </div>
  )
}
