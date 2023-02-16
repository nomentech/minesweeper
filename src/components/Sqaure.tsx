import {
  unrevealed,
  numbers,
  mine,
  mine_red,
  flag,
  flag_red,
} from '../assets/icons'
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
  return (
    <div
      onClick={onClick}
      onContextMenu={onRightClick}
      onDoubleClick={onDoubleClick}
      className='square'
    >
      <img width='100%' height='100%' src={getValue(cell)} alt='' />
    </div>
  )
}

function getValue(cell: Cell) {
  if (cell.isWrongFlag) return flag_red
  if (cell.isFlag) return flag
  if (!cell.isRevealed) return unrevealed
  if (cell.isDetonated) return mine_red
  if (cell.isMine) return mine
  return numbers[cell.mineCount]
}
