import { useEffect, useState } from 'react'
import { useBoard } from '../context/BoardContext'
import { ICONS } from '../minesweeper/contants'

export default function GameToolbar() {
  const board = useBoard()
  const isWon = board.isWon
  const counter = board.mines - board.flags

  let emoji = ICONS.neutral
  if (isWon === true) emoji = ICONS.won
  if (isWon === false) emoji = ICONS.lost

  return (
    <div className="toolbar">
      <div className="counter">{counter}</div>
      <div className="emoji">{emoji}</div>
      <Timer />
    </div>
  )
}

function Timer() {
  const board = useBoard()
  const isPlaying = board.isPlaying

  const [timer, setTimer] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      if (isPlaying) setTimer((c) => c + 1)
    }, 1000)
    return () => clearInterval(id)
  }, [isPlaying])

  return <div className="counter">{timer}</div>
}
