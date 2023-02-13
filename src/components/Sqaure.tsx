import { unrevealed, numbers, mine, mine_red, flag } from '../icons'
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
    if (cell.isFlag) return flag
    if (!cell.isRevealed) return unrevealed
    if (cell.isDetonated) return mine_red
    if (cell.isMine) return mine
    return numbers[cell.mineCount]
  }

  return (
    <div
      onClick={onClick}
      onContextMenu={onRightClick}
      onDoubleClick={onDoubleClick}
      className="square"
    >
      <img width={24} height={24} src={getContent(cell)} alt="" />
    </div>
  )
}
