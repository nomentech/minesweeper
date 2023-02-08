import generateBoard from './utils/boardGenerator'

const board = generateBoard()

function App() {
  return (
    <div>
      {board.map((row, index) => (
        <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
          {row.map((col, index) => (
            <div
              key={index}
              style={{
                width: 20,
                height: 20,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderStyle: 'solid',
              }}
            >
              {col}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default App
