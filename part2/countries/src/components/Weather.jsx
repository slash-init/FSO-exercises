import { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ capital, darkMode }) => {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY

  useEffect(() => {
    if (!capital || !apiKey) return
    
    setLoading(true)
    setError(null)
    
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${capital}`
    
    axios.get(url)
      .then(response => {
        setWeather(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Weather API error:', error)
        setError('Failed to load weather data')
        setLoading(false)
      })
  }, [capital, apiKey])

  if (!apiKey) {
    return (
      <div className={`p-6 rounded-xl border-2 border-dashed ${
        darkMode ? 'bg-yellow-900/20 border-yellow-600 text-yellow-300' : 'bg-yellow-50 border-yellow-300 text-yellow-800'
      }`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">⚠️</span>
          <h4 className="font-semibold">Weather API Not Configured</h4>
        </div>
        <p className="text-sm">
          Add <code className="bg-black/20 px-2 py-1 rounded">VITE_WEATHER_API_KEY</code> to your .env file to see weather data for {capital}.
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center gap-4">
          <div className="animate-spin w-8 h-8 border-3 border-indigo-500 border-t-transparent rounded-full"></div>
          <span className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Loading weather for {capital}...
          </span>
        </div>
      </div>
    )
  }

  if (error || !weather) {
    return (
      <div className={`p-6 rounded-xl border ${
        darkMode ? 'bg-red-900/20 border-red-600 text-red-300' : 'bg-red-50 border-red-300 text-red-700'
      }`}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xl">❌</span>
          <h4 className="font-semibold">Weather Unavailable</h4>
        </div>
        <p className="text-sm">
          {error || `Unable to fetch weather data for ${capital}`}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Main weather display */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
        
        {/* Weather icon and main temp */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <img 
              src={weather.current.condition.icon} 
              alt={weather.current.condition.text}
              className="w-20 h-20 drop-shadow-lg"
            />
          </div>
          
          <div>
            <div className={`text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {weather.current.temp_c}°C
            </div>
            <div className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {weather.current.condition.text}
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Feels like {weather.current.feelslike_c}°C
            </div>
          </div>
        </div>

        {/* Location and time */}
        <div className="flex-1 lg:text-right">
          <h4 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            📍 {capital}
          </h4>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {weather.location.country}
          </p>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Local time: {new Date(weather.location.localtime).toLocaleTimeString()}
          </p>
        </div>
      </div>

      {/* Weather details grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <WeatherStat 
          icon="💨" 
          label="Wind Speed" 
          value={`${weather.current.wind_kph} kph`}
          sublabel={weather.current.wind_dir}
          darkMode={darkMode}
        />
        <WeatherStat 
          icon="💧" 
          label="Humidity" 
          value={`${weather.current.humidity}%`}
          darkMode={darkMode}
        />
        <WeatherStat 
          icon="👁️" 
          label="Visibility" 
          value={`${weather.current.vis_km} km`}
          darkMode={darkMode}
        />
        <WeatherStat 
          icon="🌡️" 
          label="UV Index" 
          value={weather.current.uv}
          sublabel={weather.current.uv > 6 ? 'High' : weather.current.uv > 3 ? 'Moderate' : 'Low'}
          darkMode={darkMode}
        />
      </div>

      {/* Additional details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WeatherDetail 
          icon="🌪️" 
          label="Pressure" 
          value={`${weather.current.pressure_mb} mb`}
          darkMode={darkMode}
        />
        <WeatherDetail 
          icon="🌡️" 
          label="Heat Index" 
          value={`${weather.current.heatindex_c}°C`}
          darkMode={darkMode}
        />
      </div>
    </div>
  )
}

const WeatherStat = ({ icon, label, value, sublabel, darkMode }) => (
  <div className={`p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${
    darkMode 
      ? 'bg-gray-700 border-gray-600 hover:bg-gray-650' 
      : 'bg-white border-gray-200 hover:bg-gray-50 shadow-sm'
  }`}>
    <div className="text-center">
      <div className="text-2xl mb-2">{icon}</div>
      <div className={`text-xs font-medium uppercase tracking-wide mb-1 ${
        darkMode ? 'text-gray-400' : 'text-gray-500'
      }`}>
        {label}
      </div>
      <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {value}
      </div>
      {sublabel && (
        <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {sublabel}
        </div>
      )}
    </div>
  </div>
)

const WeatherDetail = ({ icon, label, value, darkMode }) => (
  <div className={`flex items-center gap-3 p-3 rounded-lg ${
    darkMode ? 'bg-gray-700' : 'bg-gray-50'
  }`}>
    <span className="text-xl">{icon}</span>
    <div className="flex-1">
      <div className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {label}
      </div>
      <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {value}
      </div>
    </div>
  </div>
)

export default Weather