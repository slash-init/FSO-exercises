const mongoose = require('mongoose')
const app = require('./app')
const config = require('./utils/config')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    app.listen(config.PORT, () => {
      console.log(`Server running on ${config.PORT}`)
    })
  })
  .catch(error => {
    console.error('error connecting to MongoDB:', error.message)
  })