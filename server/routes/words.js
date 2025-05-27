const express = require('express')
const router = express.Router()
const Word = require('../models/Word')

// GET all words
router.get('/', async (req, res) => {
  const words = await Word.find()
  res.json(words)
})

// GET a word by query
router.get('/:query', async (req, res) => {
  try {
    const { query } = req.params
    const { exact } = req.query

    if (exact === 'true') {
      const word = await Word.findOne({
        word: { $regex: `^${query}$`, $options: 'i' },
      })

      if (!word) return res.status(404).json({ message: 'Word not found' })

      res.json(word)
    } else {
      const words = await Word.find({
        word: { $regex: query, $options: 'i' },
      })

      if (!words.length) return res.status(404).json({ message: 'No matches' })

      res.json(words)
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

// DELETE a word by id
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
