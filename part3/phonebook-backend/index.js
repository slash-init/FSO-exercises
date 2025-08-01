require('dotenv').config()

const express = require('express') //importing express
const morgan = require('morgan') //importing morgan
const app = express() //creating the instance app which has all the methods and properties like app.get etc..
const Person = require('./models/person')


// Serve static frontend
app.use(express.static('dist'))

app.use(express.json())// Middleware to parse incoming JSON requests and populate req.body
//exercise-3.7
app.use(morgan(':method :url :status :response-time ms - :body')); //using morgan
//exercise-3.8
morgan.token('body',(req)=> {
    return JSON.stringify(req.body);
})


//exercise-3.1
app.get('/api/persons', (request, response) => {
    // request: info about what the client asked for
    // response: what you send back
    Person.find({}).then(persons => {
        response.json(persons) // send the persons array as JSON
    }) 
})
//exercise-3.2
app.get('/info', (request, response) => {
    const time = new Date() //get a Date object
    response.send(`<div>Request received at: ${time}</div>
        <div>Phonebook has info for ${persons.length} people</div>`)
})
//exercise-3.3
app.get('/api/persons/:id', (request, response) => { //:id is a route parameter
    Person.findById(request.params.id).then(person =>{
        response.json(person)
    })
})
//exercise-3.4
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id) //filter creates a new array leaving out the object with param id
    response.status(204).end()
    //204 means "No Content".
    //It tells the client: "The request was successful, but there is no content to send back."
})

app.post('/api/persons', (request, response) => {
    const body = request.body //body of input given by client(while posting)
    //400 - bad request
    if (!body.name || !body.number) {
        return response.status(400).json({ error: 'name or number is missing' })
    }

    const person = new Person({
        "name": body.name,
        "number": body.number
    }) //making the object using the request input

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})
//put method for mobile no. updation
app.put('/api/persons/:id', (request, response)=> {
    const id = request.params.id
    const body = request.body

    const person = persons.find(person => person.id === id)
    if(!person) {
        return response.status(404).json({error : 'person not found'})
    }
    const updatedPerson = {...person, name: body.name, number: body.number}
    persons = persons.map(person => person.id !== id ? person : updatedPerson)

    response.json(updatedPerson)
})


const PORT = process.env.PORT
app.listen(PORT, () => { //sets the server to listen for incoming http requests on port 3001
    console.log(`Server running on port ${PORT}`)
})
