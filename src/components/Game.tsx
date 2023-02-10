import { BoardProvider } from '../BoardContext'
import Board from './Board'

export default function Game() {
  return (
    <BoardProvider>
      <Board />
    </BoardProvider>
  )
}
