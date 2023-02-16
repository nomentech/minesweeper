import { useBoard } from '../context/BoardContext'

export default function Footer() {
  const board = useBoard()

  let content = ''
  // board.isWon could be null.
  // Use === to compare to true/false is necessary
  if (board.isWon === true) content = 'You won 😎'
  if (board.isWon === false) content = 'You lost 😔'

  return <div className='footer'>{content}</div>
}
