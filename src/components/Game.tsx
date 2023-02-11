import { BoardProvider } from '../context/BoardContext'
import GameBoard from './GameBoard'
import Header from './Header'

export default function Game() {
  return (
    <BoardProvider>
      <div className="container">
        <Header />
        <GameBoard />
      </div>
    </BoardProvider>
  )
}
