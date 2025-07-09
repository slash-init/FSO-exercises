import { useEffect, useState } from 'react'
import axios from 'axios'
import Country from './components/Country'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data);
      })
  }, []);

  useEffect(() => {
    if (search === '') {
      setFiltered([])
    } else {
      const results = countries.filter(country =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
      setFiltered(results)
    }
  }, [search, countries])

  const handleClick = (cca3) => {
    const country = countries.find(c => c.cca3 === cca3);
    if (country) {
      setFiltered([country]);
    }
  }

  return (
    <div>
      <form>
        <label>Find Countries:
          <input type="text"
            value={search}
            placeholder='Search countries...'
            onChange={e => setSearch(e.target.value)} />
        </label>
      </form>
      {
        filtered.length > 10 ? (
          <div>Too many matches, please refine your search.</div>
        ) : filtered.length === 1 ? (
          <div><Country filtered={filtered} /></div>
        ) : (
          <ul>
            {filtered.map((country) => (
              <li key={country.cca3}>{country.name.common} <button onClick={() => handleClick(country.cca3)}>Show</button></li>
            ))}
          </ul>)}
    </div>
  )
}

export default App
