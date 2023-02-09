import { Cell } from '../utils/boardGenerator'

export default function Square({
  cell,
  onClick,
  onRightClick,
}: {
  cell: Cell
  onClick: React.MouseEventHandler
  onRightClick: React.MouseEventHandler
}) {
  function getContent(cell: Cell) {
    if (!cell.isRevealed) return ''
    if (cell.isFlag) return 'F'
    if (cell.isMine) return 'M'
    return cell.mineCount
  }

  return (
    <div
      onClick={onClick}
      onContextMenu={onRightClick}
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
      {getContent(cell)}
    </div>
  )
}
