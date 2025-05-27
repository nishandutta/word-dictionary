require('dotenv').config() // ✅ Must be at the top

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const wordRoutes = require('./routes/words')

const app = express()
const PORT = process.env.PORT || 5002

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/words', wordRoutes)
console.log('Mongo URI:', process.env.MONGO_URI)
// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
  )
  .catch((err) => console.error('MongoDB connection error:', err))
