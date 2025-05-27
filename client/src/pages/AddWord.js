import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AddWord() {
  const [form, setForm] = useState({
    word: '',
    definition: '',
    imageUrl: '',
    videoUrl: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/words`, form)
      navigate('/')
    } catch (err) {
      setError('Failed to add word. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='p-4 max-w-xl mx-auto'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Add New Word</h2>

      {error && (
        <p className='text-red-600 bg-red-100 p-2 rounded mb-4 text-center'>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className='space-y-4'>
        {['word', 'definition', 'imageUrl', 'videoUrl'].map((field) => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field[0].toUpperCase() + field.slice(1)}
            className='w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-400'
            required={field !== 'imageUrl' && field !== 'videoUrl'}
          />
        ))}

        <button
          type='submit'
          disabled={loading}
          className={`w-full text-white px-4 py-2 rounded ${
            loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600'
          }`}
        >
          {loading ? (
            <div className='flex items-center justify-center gap-2'>
              <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
              Adding...
            </div>
          ) : (
            'Add Word'
          )}
        </button>
      </form>
    </div>
  )
}

export default AddWord
