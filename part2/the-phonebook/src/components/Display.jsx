const Display = ({ persons = [], search = '', deleteData }) => {
  // If search is empty, show all
  const filteredPersons = search === ''
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(search.toLowerCase())
      )

  return (
    <div>
      {filteredPersons.map(person => (
        <div key={person.id ? person.id : person.name}>
          {person.name} {person.number}
          <button onClick={() => deleteData(person.id, person.name)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default Display