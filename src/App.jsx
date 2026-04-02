import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Subscription from './pages/Subscription'
import './index.css'

function App() {
  return (
    <HashRouter>
      <div className="app">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/subscription" element={<Subscription />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  )
}

export default App
