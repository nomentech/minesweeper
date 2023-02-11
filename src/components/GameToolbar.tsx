import { useEffect, useState } from 'react'
import { useBoard } from '../context/BoardContext'

export default function GameToolbar({ startTimer }: { startTimer: boolean }) {
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
      <div>😄</div>
      <div>{timer}</div>
    </div>
  )
}
