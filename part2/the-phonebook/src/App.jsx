import { useState, useEffect } from 'react'
import Display from './components/Display'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notifMessage, setNotifMessage] = useState(null)

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
        setNotifMessage({ text: `${name} was deleted.`, type: 'error' }) 
        setTimeout(()=> {
          setNotifMessage(null)
        }, 5000)
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
        .update(existingPerson.id, nameObject)
        .then(updatedPerson => {
          setPersons(persons.map(person =>
            person.id !== existingPerson.id ? person : updatedPerson
          ))
          setNotifMessage({ text: `Updated the phone no. of ${updatedPerson.name}.`, type: 'success' })
          setTimeout(() => {
            setNotifMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setNotifMessage({
            text: `Information of ${existingPerson.name} has already been removed from server.`,
            type: 'error'
          })
          setTimeout(() => {
            setNotifMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== existingPerson.id))
        })
    }
    else {
      personService //send entered data to backend
        .create(nameObject)
        .then(returnedData => {
          setPersons(persons.concat(returnedData))
          setNewNumber('')
          setNewName('')
          setNotifMessage({ text: `'${returnedData.name}' was added.`, type: 'success' }) // Show notification
          setTimeout(() => {
            setNotifMessage(null)
          }, 5000)
        })
        .catch(error => {
          setNotifMessage({text:'Failed to add contact.', type: 'error'})
          setTimeout(() => {
            setNotifMessage(null)
          }, 5000)
        })
    }
  }

  console.log(persons)
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notifMessage?.text} type={notifMessage?.type} />
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