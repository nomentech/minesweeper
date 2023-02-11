import Game from './components/Game'
import Header from './components/Header'
import { BoardProvider } from './context/BoardContext'

function App() {
  return (
    <BoardProvider>
      <div className="container">
        <Header />
        <Game />
      </div>
    </BoardProvider>
  )
}

export default App
