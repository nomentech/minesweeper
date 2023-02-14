import { useEffect, useState } from 'react'
import { ActionType } from '../context/actionType'
import { useBoard, useBoardDispatch } from '../context/BoardContext'
import { face_lose, face_neutral, face_win } from '../icons'
import { BOARD_LIST } from '../minesweeper/boardList'

export default function GameToolbar() {
  const board = useBoard()
  const boardDispatch = useBoardDispatch()

  const isWon = board.isWon
  const counter = board.mines - board.flags

  let emoji = face_neutral
  if (isWon === true) emoji = face_win
  if (isWon === false) emoji = face_lose

  function handleClick() {
    const newBoard =
      BOARD_LIST.find((b) => b.level === board.level) || BOARD_LIST[0]
    boardDispatch({
      type: ActionType.reset_board,
      payload: { board: newBoard },
    })
  }

  return (
    <div className="toolbar">
      <div className="counter">{String(counter).padStart(3, '0')}</div>
      <div className="emoji" onClick={handleClick}>
        <img width="100%" height="100%" src={emoji} alt="" />
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
