import { Cell } from '../context/minesweeper'

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
