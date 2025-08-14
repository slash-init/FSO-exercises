//importing
const mongoose = require('mongoose')

//check if pass is given as argument in cli
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

//pass
const password = process.argv[2]

const url = `mongodb+srv://amvermagaurav007:${password}@cluster0.wl3jw40.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

//connection
mongoose.connect(url)
//schema
const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})
//Model

const Person = mongoose.model('Person', personSchema)
//check for args
if (process.argv.length === 3) {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => console.log(person.name, person.number))
    mongoose.connection.close()
  })
}
else {
  //creating
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
  //saving
  person.save().then(result => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}

