require('dotenv').config()

const express = require('express') //importing express
const morgan = require('morgan') //importing morgan
const app = express() //creating the instance app which has all the methods and properties like app.get etc..
const Person = require('./models/person')


// Serve static frontend
app.use(express.static('dist'))
app.use(express.json())// Middleware to parse incoming JSON requests and populate req.body
//exercise-3.8
morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})
//exercise-3.7
app.use(morgan(':method :url :status :response-time ms - :body')) //using morgan



//exercise-3.1
app.get('/api/persons', (request, response, next) => {
  // request: info about what the client asked for
  // response: what you send back
  Person.find({}).then(persons => {
    response.json(persons) // send the persons array as JSON
  })
    .catch(error => next(error))
})
//exercise-3.2
app.get('/info', (request, response, next) => {
  const time = new Date() //get a Date object
  response.send(`<div>Request received at: ${time}</div>
        <div>Phonebook has info for ${persons.length} people</div>`)
    .catch(error => next(error))
})
//exercise-3.3
app.get('/api/persons/:id', (request, response, next) => { //:id is a route parameter
  Person.findById(request.params.id).then(person => {
    if (!person) {
      response.status(404).end()
    }
    else { response.json(person) }
  })
    .catch(error => next(error))
})
//exercise-3.4
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id) //built in method of mongoose
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
    //204 means "No Content".
    //It tells the client: "The request was successful, but there is no content to send back."
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body //body of input given by client(while posting)
  //400 - bad request

  const person = new Person({
    'name': body.name,
    'number': body.number
  }) //making the object using the request input

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
})
//put method for mobile no. updation
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }
      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})
//middleware for catching unkown endpoints requests
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
//error handler
// Error middleware: 4 parameters
const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(unknownEndpoint)
app.use(errorHandler)
const PORT = process.env.PORT
app.listen(PORT, () => { //sets the server to listen for incoming http requests on port 3001
  console.log(`Server running on port ${PORT}`)
})
