import Game from './components/Game'
import Header from './components/Header'
import Footer from './components/Footer'
import { BoardProvider } from './context/BoardContext'

function App() {
  return (
    <BoardProvider>
      <div className="container">
        <Header />
        <Game />
        <Footer />
      </div>
    </BoardProvider>
  )
}

export default App
