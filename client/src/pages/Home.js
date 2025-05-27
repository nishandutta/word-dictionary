import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Home() {
  const [words, setWords] = useState([])
  const [query, setQuery] = useState('')

  const fetchWords = async () => {
    const res = await axios.get('http://localhost:5002/words')
    setWords(res.data)
  }

  // const searchWord = async () => {
  //   if (!query) return fetchWords()
  //   try {
  //     const res = await axios.get(
  //       `http://localhost:5002/words/${query}?exact=false`
  //     )
  //     setWords([res.data])
  //   } catch {
  //     setWords([])
  //   }
  // }

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5002/words/${query}?exact=false`
      )
      setWords(res.data) // this should be an array
    } catch (err) {
      console.error('Search failed:', err.response?.data || err.message)
      setWords([]) // clear results on error
    }
  }

  useEffect(() => {
    fetchWords()
  }, [])

  return (
    <div>
      <div className='flex gap-2 mb-4'>
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search word...'
        />
        <button onClick={handleSearch}>Search</button>

        <ul>
          {words.map((w, idx) => (
            <li key={idx}>
              <h3>{w.word}</h3>
              <p>{w.definition}</p>
              <img src={w.imageUrl} alt={w.word} />
            </li>
          ))}
        </ul>

        <Link to='/add' className='bg-green-500 text-white px-4 py-2 rounded'>
          + Add
        </Link>
      </div>
    </div>
  )
}

export default Home
