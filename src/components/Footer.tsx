import { useBoard } from '../context/BoardContext'

export default function Footer() {
  const board = useBoard()

  let content = ''
  if (board.isWon === true) content = 'You won 😎'
  if (board.isWon === false) content = 'You lost 😔'

  return <div className="footer">{content}</div>
}
