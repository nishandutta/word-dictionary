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

  useEffect(() => {
    axios.get(`http://localhost:5002/words/id/${id}?exact=true`).then((res) => {
      setForm({
        word: res.data.word,
        definition: res.data.definition,
        imageUrl: res.data.imageUrl,
        videoUrl: res.data.videoUrl,
      })
    })
  }, [id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:5002/words/${id}`, form)
      navigate('/')
    } catch (err) {
      console.error('Update failed:', err.message)
    }
  }

  return (
    <div className='p-4 max-w-xl mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>Edit Word</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        {['word', 'definition', 'imageUrl', 'videoUrl'].map((field) => (
          <input
            key={field}
            type='text'
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field}
            className='w-full border px-3 py-2 rounded'
          />
        ))}
        <button
          type='submit'
          className='bg-blue-600 text-white px-4 py-2 rounded'
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default EditWord
