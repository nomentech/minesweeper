import { useEffect, useState } from 'react'
import { useBoard, useBoardDispatch } from '../context/BoardContext'
import { BOARD_LIST, ICONS } from '../minesweeper/contants'

export default function GameToolbar() {
  const board = useBoard()
  const boardDispatch = useBoardDispatch()

  const isWon = board.isWon
  const counter = board.mines - board.flags

  let emoji = ICONS.neutral
  if (isWon === true) emoji = ICONS.won
  if (isWon === false) emoji = ICONS.lost

  function handleClick() {
    const newBoard = BOARD_LIST.find((b) => b.level === board.level)
    boardDispatch({ type: 'reset_board', payload: { board: newBoard } })
  }

  return (
    <div className="toolbar">
      <div className="counter">{String(counter).padStart(3, '0')}</div>
      <div className="emoji" onClick={handleClick}>
        {emoji}
      </div>
      <Timer />
    </div>
  )
}

function Timer() {
  const board = useBoard()
  const isPlaying = board.isPlaying
  const isEmpty = board.isEmpty

  const [timer, setTimer] = useState(0)

  useEffect(() => {
    if (isEmpty) setTimer(0)

    const id = setInterval(() => {
      if (isPlaying) setTimer((c) => c + 1)
    }, 1000)

    return () => clearInterval(id)
  }, [isPlaying, isEmpty])

  return <div className="counter">{String(timer).padStart(3, '0')}</div>
}
