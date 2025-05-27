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
  const navigate = useNavigate()

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:5002/words', form)
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4 max-w-xl mx-auto'>
      {['word', 'definition', 'imageUrl', 'videoUrl'].map((field) => (
        <input
          key={field}
          name={field}
          value={form[field]}
          onChange={handleChange}
          placeholder={field[0].toUpperCase() + field.slice(1)}
          className='w-full border p-2 rounded'
          required={field !== 'imageUrl' && field !== 'videoUrl'}
        />
      ))}
      <button
        type='submit'
        className='bg-blue-600 text-white px-4 py-2 rounded'
      >
        Add Word
      </button>
    </form>
  )
}

export default AddWord
