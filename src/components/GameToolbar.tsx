import { useEffect, useState } from 'react'
import { useBoard } from '../context/BoardContext'
import { ICONS } from '../minesweeper/contants'

export default function GameToolbar({
  startTimer,
  detonated,
}: {
  startTimer: boolean
  detonated: boolean | null
}) {
  const board = useBoard()
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      if (startTimer) setTimer((c) => c + 1)
    }, 1000)
    return () => clearInterval(id)
  }, [startTimer])

  return (
    <div className="toolbar">
      <div>{board.mines}</div>
      <div className="emoji">{detonated ? ICONS.frown : ICONS.smiley}</div>
      <div>{timer}</div>
    </div>
  )
}
