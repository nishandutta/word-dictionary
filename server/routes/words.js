const express = require('express')
const router = express.Router()
const Word = require('../models/Word')

// GET all words
router.get('/', async (req, res) => {
  const words = await Word.find()
  res.json(words)
})

// GET a word by query
// router.get('/:query', async (req, res) => {
//   const word = await Word.findOne({ word: req.params.query })
//   word ? res.json(word) : res.status(404).json({ error: 'Word not found' })
// })

// router.get('/:query', async (req, res) => {
//   try {
//     const word = await Word.findOne({
//       word: { $regex: `^${req.params.query}$`, $options: 'i' }, // exact match, ignore case
//     })

//     if (!word) {
//       return res.status(404).json({ message: 'Word not found' })
//     }

//     res.json(word)
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// })

router.get('/:query', async (req, res) => {
  try {
    const { query } = req.params
    const { exact } = req.query

    if (exact === 'true') {
      const word = await Word.findOne({
        word: { $regex: `^${query}$`, $options: 'i' }, // exact match
      })

      if (!word) return res.status(404).json({ message: 'Word not found' })

      res.json(word)
    } else {
      const words = await Word.find({
        word: { $regex: query, $options: 'i' }, // partial match
      })

      if (!words.length) return res.status(404).json({ message: 'No matches' })

      res.json(words) // return array
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

// GET a word by ID (for edit)
router.get('/id/:id', async (req, res) => {
  try {
    const word = await Word.findById(req.params.id)
    if (!word) return res.status(404).json({ message: 'Word not found' })
    res.json(word)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Word.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ message: 'Word not found' })
    res.json({ message: 'Word deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST a new word
router.post('/', async (req, res) => {
  try {
    const newWord = new Word(req.body)
    await newWord.save()
    res.status(201).json(newWord)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// PUT update word
router.put('/:id', async (req, res) => {
  const updated = await Word.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.json(updated)
})

// DELETE a word
router.delete('/:id', async (req, res) => {
  await Word.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

module.exports = router
