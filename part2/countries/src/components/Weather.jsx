import { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY // for Vite projects

  useEffect(() => {
    if (!capital) return
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${capital}`
    axios.get(url)
      .then(response => setWeather(response.data))
      .catch(error => setWeather(null))
  }, [capital, apiKey])

  if (!weather) return <div>Loading weather...</div>

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <div>Temperature: {weather.current.temp_c}°C</div>
      <div>Condition: {weather.current.condition.text}</div>
      <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
      <div>Wind: {weather.current.wind_kph} kph</div>
    </div>
  )
}

export default Weather