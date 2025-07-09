import Weather from './Weather'

const Country = ({ filtered }) => {
  const country = filtered[0];
  return (
    <div>
      <h2>{country.name.common}</h2>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="200" />
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km²</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages ?? {}).map((lang, i) => (
          <li key={i}>{lang}</li>
        ))}
      </ul>
      <h3>Currencies</h3>
      <ul>
        {Object.values(country.currencies ?? {}).map((curr, i) => (
          <li key={i}>{curr.name} ({curr.symbol})</li>
        ))}
      </ul>
      <h3>Timezones</h3>
      <ul>
        {country.timezones.map((tz, index) => (
          <li key={index}>{tz}</li>
        ))}
      </ul>
      <Weather capital={country.capital} />
    </div>
  )
}

export default Country