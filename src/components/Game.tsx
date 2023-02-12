import { useState } from 'react'
import GameBoard from './GameBoard'
import GameToolbar from './GameToolbar'

export default function Game() {
  const [startTimer, setStartTimer] = useState(false)
  const [detonated, setDetonated] = useState(false)

  return (
    <div className="content">
      <div className="game">
        <GameToolbar startTimer={startTimer} detonated={detonated} />
        <GameBoard setStartTimer={setStartTimer} setDetonated={setDetonated} />
      </div>
    </div>
  )
}
