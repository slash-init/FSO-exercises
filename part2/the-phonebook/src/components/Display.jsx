const Display = ({ persons, search }) => {
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
        </div>
      ))}
    </div>
  )
}

export default Display