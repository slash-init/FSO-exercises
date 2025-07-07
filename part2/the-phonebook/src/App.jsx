import { useState, useEffect } from 'react'
import Display from './components/Display'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {  //Display Backend Data
    personService
      .getAll()
      .then(initialData => {
        setPersons(initialData)
      })
  }, [])
  //deletion of data
  const deleteDataOf = (id, name) => {
    personService
      .deletion(id, name)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id)) //update ui when a contact is deleted 
      })
  }

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
    if (newNumber === '') {
      alert('Enter the phone number.')
      return
    }
    else if (isNaN(newNumber)) {
      alert('Enter a valid phone number. It should only contain numbers.')
      return
    }
    const nameObject = {
      name: newName,
      number: newNumber
    }
    const existingPerson = persons.find(person => person.name === newName)
    //update mobile no. if person name exists
    if (existingPerson) {
      personService
        .update(existingPerson.id,nameObject)
        .then(updatedPerson => {
          setPersons(persons.map(person =>
            person.id !== existingPerson.id ? person : updatedPerson
          ))
          setNewName('')
          setNewNumber('')
        })
    }
    else {
      personService //send entered data to backend
        .create(nameObject)
        .then(returnedData => {
          setPersons(persons.concat(returnedData))
          setNewNumber('')
          setNewName('')
        })
    }
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
      <Display persons={persons} search={search} deleteData={deleteDataOf} />
    </div>
  )
}

export default App