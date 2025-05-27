import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function EditWord() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    word: '',
    definition: '',
    imageUrl: '',
    videoUrl: '',
  })

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchWord = async () => {
      setLoading(true)
      try {
        const res = await axios.get(
          `http://localhost:5002/words/id/${id}?exact=true`
        )
        setForm({
          word: res.data.word || '',
          definition: res.data.definition || '',
          imageUrl: res.data.imageUrl || '',
          videoUrl: res.data.videoUrl || '',
        })
      } catch (err) {
        setError('Failed to load word. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchWord()
  }, [id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      await axios.put(`http://localhost:5002/words/${id}`, form)
      navigate('/')
    } catch (err) {
      setError('Update failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className='p-6 text-center'>
        <div className='w-8 h-8 mx-auto border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
        <p className='mt-2 text-gray-500'>Loading...</p>
      </div>
    )
  }

  return (
    <div className='p-4 max-w-xl mx-auto'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Edit Word</h2>

      {error && (
        <p className='text-red-500 bg-red-100 p-2 rounded mb-4'>{error}</p>
      )}

      <form onSubmit={handleSubmit} className='space-y-4'>
        {['word', 'definition', 'imageUrl', 'videoUrl'].map((field) => (
          <input
            key={field}
            type='text'
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field}
            className='w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300'
            required={field === 'word' || field === 'definition'}
          />
        ))}
        <button
          type='submit'
          disabled={submitting}
          className={`w-full text-white px-4 py-2 rounded ${
            submitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600'
          }`}
        >
          {submitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}

export default EditWord
