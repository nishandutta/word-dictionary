import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AddWord from './pages/AddWord'
import EditWord from './pages/EditWord'
import './App.css'

function App() {
  return (
    <div className='relative min-h-screen overflow-hidden'>
      <div
        className='absolute inset-0 bg-cover bg-center z-0 before:content-[""] before:absolute before:inset-0 before:bg-white/60 before:backdrop-blur-md'
        style={{ backgroundImage: 'url(/background.jpg)' }}
      ></div>

      <div className='relative z-10 container mx-auto p-4'>
        <h1 className='text-3xl font-bold text-center mb-6'>
          📘 Word Dictionary
        </h1>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/add' element={<AddWord />} />
            <Route path='/edit/:id' element={<EditWord />} />
          </Routes>
        </Router>
      </div>
    </div>
  )
}

export default App
