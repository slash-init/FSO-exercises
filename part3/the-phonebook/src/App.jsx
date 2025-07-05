import { useState } from 'react'
import Display from './components/Display'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(newName + ' is already added to phonebook')
      return
    }
    if (newNumber === '') {
      alert('Enter the phone number.')
      return
    }
    const nameObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  console.log(persons)
  return (
    <div>
      <h1>Phonebook</h1>
      <Filter search={search} handleSearch={handleSearch} />      
      <h2>add a new</h2>
      <PersonForm 
        addName={addName} 
        newName={newName} 
        newNumber={newNumber}
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
      />
      <h2>Numbers</h2>
      <Display persons={persons} search={search} />
    </div>
  )
}

export default App