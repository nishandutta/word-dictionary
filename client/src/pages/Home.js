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

      {/* Word List */}
      {words.length > 0 ? (
        <ul className='space-y-4'>
          {words.map((w, idx) => (
            <li
              key={idx}
              className='border border-gray-300 rounded p-4 shadow-sm'
            >
              <h3 className='text-xl font-bold capitalize'>{w.word}</h3>
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
