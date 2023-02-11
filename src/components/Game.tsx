import { useState } from 'react'
import GameBoard from './GameBoard'
import GameToolbar from './GameToolbar'

export default function Game() {
  const [startTimer, setStartTimer] = useState(false)

  return (
    <div className="content">
      <div className="game">
        <GameToolbar startTimer={startTimer} />
        <GameBoard setStartTimer={setStartTimer} />
      </div>
    </div>
  )
}
