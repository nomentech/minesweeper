import generateBoard from '../utils/boardGenerator'
import Square from './Sqaure'

const board = generateBoard()

export default function Board() {
  return (
    <div>
      {board.map((row, index) => (
        <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
          {row.map((col, index) => (
            <Square key={index} initCell={col} />
          ))}
        </div>
      ))}
    </div>
  )
}
