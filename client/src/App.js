import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AddWord from './pages/AddWord'
import './App.css'
import EditWord from './pages/EditWord'

function App() {
  return (
    <Router>
      <div className='container mx-auto p-4'>
        <h1 className='text-3xl font-bold text-center mb-6'>
          📘 Word Dictionary
        </h1>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add' element={<AddWord />} />
          <Route path='/edit/:id' element={<EditWord />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
