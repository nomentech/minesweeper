import { Cell } from '../minesweeper/types'

export default function Square({
  cell,
  onClick,
  onRightClick,
  onDoubleClick,
}: {
  cell: Cell
  onClick: React.MouseEventHandler
  onRightClick: React.MouseEventHandler
  onDoubleClick: React.MouseEventHandler
}) {
  function getContent(cell: Cell) {
    if (!cell.isRevealed) return ''
    if (cell.isFlag) return '🚩'
    if (cell.isMine) return '💣'
    if (cell.mineCount === 0) return '⬜️'
    return cell.mineCount
  }

  return (
    <div
      onClick={onClick}
      onContextMenu={onRightClick}
      onDoubleClick={onDoubleClick}
      className={`square ${!cell.isRevealed && 'square-closed'}`}
    >
      {getContent(cell)}
    </div>
  )
}
