import { ICONS } from '../minesweeper/contants'
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
    if (cell.isFlag) return ICONS.flag
    if (!cell.isRevealed) return ICONS.unrevealed
    if (cell.isMine) return ICONS.mine
    if (cell.mineCount === 0) return ICONS.empty
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
