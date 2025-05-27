import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Home() {
  const [words, setWords] = useState([])
  const [query, setQuery] = useState('')

  const fetchWords = async () => {
    try {
      const res = await axios.get('http://localhost:5002/words')
      setWords(res.data)
    } catch (error) {
      console.error('Failed to fetch words:', error.message)
    }
  }

  const handleSearch = async () => {
    if (!query.trim()) {
      return fetchWords()
    }

    try {
      const res = await axios.get(
        `http://localhost:5002/words/${query}?exact=false`
      )
      setWords(res.data)
    } catch (err) {
      console.error('Search failed:', err.response?.data || err.message)
      setWords([])
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this word?')) return

    try {
      await axios.delete(`http://localhost:5002/words/${id}`)
      setWords((prev) => prev.filter((word) => word._id !== id))
    } catch (err) {
      console.error('Delete failed:', err.response?.data || err.message)
    }
  }

  useEffect(() => {
    fetchWords()
  }, [])

  return (
    <div className='p-4 max-w-3xl mx-auto'>
      {/* Search Section */}
      <div className='flex flex-col sm:flex-row gap-2 sm:items-center mb-6'>
        {/* Line 1 on mobile, single row on desktop */}
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search word...'
          className='border border-gray-400 px-3 py-2 rounded w-full'
        />
        {/* Line 2 on mobile */}
        <div className='flex gap-2'>
          <button
            onClick={handleSearch}
            className='bg-blue-500 text-white px-4 py-2 rounded'
          >
            Search
          </button>
          <Link
            to='/add'
            className='bg-green-500 text-white px-4 py-2 rounded whitespace-nowrap'
          >
            + Add
          </Link>
        </div>
      </div>

      {words.length > 0 ? (
        <ul className='space-y-4'>
          {words.map((w, idx) => (
            <li
              key={idx}
              className='border border-gray-300 rounded p-4 shadow-sm'
            >
              <div className='flex justify-between items-center'>
                <h3 className='text-xl font-bold capitalize'>{w.word}</h3>
                <div className='flex gap-2'>
                  <Link
                    to={`/edit/${w._id}`}
                    className='bg-yellow-400 px-3 py-1 rounded text-sm text-black'
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(w._id)}
                    className='bg-red-500 text-white px-3 py-1 rounded text-sm'
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className='mb-2 text-gray-700'>{w.definition}</p>
              {w.imageUrl && (
                <img
                  src={w.imageUrl}
                  alt={w.word}
                  className='w-48 h-auto rounded'
                />
              )}
              {w.videoUrl && (
                <video
                  src={w.videoUrl}
                  controls
                  className='mt-2 w-64 rounded'
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-gray-500'>No words found.</p>
      )}
    </div>
  )
}

export default Home
