import GameBoard from './GameBoard'
import GameToolbar from './GameToolbar'

export default function Game() {
  return (
    <div className="content">
      <div className="game">
        <GameToolbar />
        <GameBoard />
      </div>
    </div>
  )
}
