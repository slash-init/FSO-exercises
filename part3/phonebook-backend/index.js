const express = require('express') //importing express
const app = express() //creating the instance app which has all the methods and properties like app.get etc..

let persons = [ //array of objects, used let so we can make changes to it
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.use(express.json()) //enables JSON body parsing
//exercise-3.1
app.get('/api/persons', (request, response) => {
    // request: info about what the client asked for
    // response: what you send back
    response.json(persons) // send the persons array as JSON
})
//exercise-3.2
app.get('/info', (request, response) => {
    const time = new Date() //get a Date object
    response.send(`<div>Request received at: ${time}</div>
        <div>Phonebook has info for ${persons.length} people</div>`)
})
//exercise-3.3
app.get('/api/persons/:id', (request, response) => { //:id is a route parameter
    const id = request.params.id //when a client requests /api/persons/2, Express puts 2 into request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
        //response.status(404) sets the HTTP status code to 404(Not Found)
        //.end() ends the response without sending any data, must for finishing the response
    }
})
//exercise-3.4
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id) //filter creates a new array leaving out the object with param id
    response.status(204).end()
    //204 means "No Content".
    //It tells the client: "The request was successful, but there is no content to send back."
})
//exercise-3.5 and 3.6
const generateId = () => {
    // Generates a random integer between 1 and 1000000
    return String(Math.floor(Math.random() * 1000000))
}
app.post('/api/persons', (request, response) => {
    const body = request.body //body of input given by client(while posting)
    //400 - bad request
    if (!body.name || !body.number) {
        return response.status(400).json({ error: 'name or number is missing' })
    }
    else if(persons.find(person => body.name === person.name)) {
        return response.status(400).json({ error: 'name must be unique' }) //used return so that the code stops here and doesnt post rubbish data
    }

    const person = {
        "id": generateId(),
        "name": body.name,
        "number": body.number
    } //making the object using the request input

    persons = persons.concat(person) //concatenating with the persons array
    response.json(person) //response.json(person) is used to send a JavaScript object as a JSON response to the client.
    //always send a response
})









const PORT = 3001
app.listen(PORT, () => { //sets the server to listen for incoming http requests on port 3001
    console.log(`Server running on port ${PORT}`)
})
