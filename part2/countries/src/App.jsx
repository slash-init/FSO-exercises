import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'

const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-12">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-indigo-200 rounded-full animate-spin"></div>
      <div className="absolute top-0 left-0 w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
    <span className="ml-4 text-lg text-gray-600 dark:text-gray-300">Loading countries...</span>
  </div>
)

const SearchInput = ({ value, onChange, darkMode }) => (
  <div className="relative group mb-8">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search countries by name, capital, or region..."
      className={`w-full pl-10 pr-4 py-4 text-lg rounded-2xl border-2 transition-all duration-300 
        focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500
        ${darkMode 
          ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
          : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
        }`}
    />
  </div>
)

const CountryListItem = ({ country, onShow, darkMode }) => (
  <div className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 
    hover:scale-105 hover:shadow-lg ${
    darkMode 
      ? 'bg-gray-800 border border-gray-700 hover:bg-gray-750' 
      : 'bg-white border border-gray-100 hover:bg-gray-50'
  }`}>
    <div className="flex items-center gap-4">
      <img 
        src={country.flags?.svg || country.flags?.png} 
        alt={`Flag of ${country.name.common}`}
        className="w-8 h-6 object-cover rounded"
      />
      <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {country.name.common}
      </span>
    </div>
    <button
      onClick={() => onShow(country)}
      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg 
        transition-colors duration-200 text-sm font-medium"
    >
      Show Details
    </button>
  </div>
)

const CountryCard = ({ country, darkMode }) => (
  <div className={`group relative overflow-hidden rounded-2xl transition-all duration-500 
    hover:scale-105 hover:-translate-y-2 hover:shadow-2xl animate-fade-in ${
    darkMode 
      ? 'bg-gray-800 border border-gray-700' 
      : 'bg-white border border-gray-100 shadow-lg'
  }`}>
    
    <div className="relative">
      {/* Flag */}
      <div className="overflow-hidden">
        <img 
          src={country.flags?.svg || country.flags?.png} 
          alt={`Flag of ${country.name.common}`}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=Flag+Not+Found'
          }}
        />
      </div>
      
      {/* Country Info */}
      <div className="p-6">
        <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {country.name.common}
        </h3>
        
        <div className="space-y-3">
          <InfoItem 
            icon="🏛️" 
            label="Capital" 
            value={country.capital?.[0] || 'N/A'} 
            darkMode={darkMode}
          />
          <InfoItem 
            icon="👥" 
            label="Population" 
            value={country.population?.toLocaleString() || 'N/A'} 
            darkMode={darkMode}
          />
          <InfoItem 
            icon="🌍" 
            label="Region" 
            value={country.region || 'N/A'} 
            darkMode={darkMode}
          />
        </div>
      </div>
    </div>
  </div>
)

const InfoItem = ({ icon, label, value, darkMode }) => (
  <div className="flex items-center gap-3">
    <span className="text-lg">{icon}</span>
    <div className="flex-1">
      <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {label}:
      </span>
      <p className={`text-sm ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
        {value}
      </p>
    </div>
  </div>
)

const ErrorMessage = ({ message, onRetry, darkMode }) => (
  <div className={`p-6 rounded-2xl border-l-4 border-red-500 animate-fade-in ${
    darkMode ? 'bg-red-900/20 text-red-300' : 'bg-red-50 text-red-700'
  }`}>
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h3 className="font-semibold mb-1">Failed to load countries</h3>
          <p className="text-sm">{message}</p>
        </div>
      </div>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
      >
        Retry
      </button>
    </div>
  </div>
)

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => (
  <button
    onClick={toggleDarkMode}
    className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
      darkMode 
        ? 'bg-yellow-500 text-white hover:bg-yellow-400' 
        : 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
    }`}
  >
    <div className="w-6 h-6">
      {darkMode ? (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </div>
  </button>
)

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [darkMode, setDarkMode] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(null)

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // Fetch countries
  const fetchCountries = async () => {
    const apis = [
      'https://studies.cs.helsinki.fi/restcountries/api/all',
      'https://restcountries.com/v3.1/all',
      'https://restcountries.com/v3/all'
    ]

    setLoading(true)
    setError(null)

    for (const apiUrl of apis) {
      try {
        console.log(`Trying API: ${apiUrl}`)
        const response = await axios.get(apiUrl, {
          timeout: 10000
        })
        
        console.log('API Response:', response.data)
        setCountries(response.data)
        setFilteredCountries(response.data)
        setLoading(false)
        return
        
      } catch (err) {
        console.error(`API ${apiUrl} failed:`, err)
        continue
      }
    }

    setError('Unable to fetch countries data. Please check your internet connection and try again.')
    setLoading(false)
  }

  useEffect(() => {
    fetchCountries()
  }, [])

  // Filter countries
  useEffect(() => {
    if (!search.trim()) {
      setFilteredCountries(countries)
      setSelectedCountry(null)
    } else {
      const searchLower = search.toLowerCase()
      const filtered = countries.filter(country =>
        country.name?.common?.toLowerCase().includes(searchLower) ||
        country.region?.toLowerCase().includes(searchLower) ||
        country.subregion?.toLowerCase().includes(searchLower) ||
        (country.capital && country.capital[0]?.toLowerCase().includes(searchLower))
      )
      setFilteredCountries(filtered)
      setSelectedCountry(null)
    }
  }, [search, countries])

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const handleShowCountry = (country) => {
    setSelectedCountry(country)
  }

  const handleBackToList = () => {
    setSelectedCountry(null)
  }

  // Determine what to render based on filtered results
  const renderContent = () => {
    if (loading) return <LoadingSpinner />
    if (error) return <ErrorMessage message={error} onRetry={fetchCountries} darkMode={darkMode} />

    // If a specific country is selected, show detailed view
    if (selectedCountry) {
      return (
        <div className="animate-fade-in">
          <div className="mb-6">
            <button
              onClick={handleBackToList}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 
                text-white rounded-lg transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to List
            </button>
          </div>
          <div className={`rounded-2xl p-8 ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
          }`}>
            <Country filtered={[selectedCountry]} darkMode={darkMode} />
          </div>
        </div>
      )
    }

    // If exactly 1 country matches search, show detailed view automatically
    if (filteredCountries.length === 1) {
      return (
        <div className="animate-fade-in">
          <div className={`rounded-2xl p-8 ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
          }`}>
            <Country filtered={filteredCountries} darkMode={darkMode} />
          </div>
        </div>
      )
    }

    // If 2-10 countries match, show list with "show" buttons
    if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
      return (
        <div className="space-y-4 animate-fade-in">
          <p className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Found {filteredCountries.length} countries. Click "Show Details" to see more info:
          </p>
          {filteredCountries.map((country, index) => (
            <div key={country.cca3 || index} style={{ animationDelay: `${index * 0.1}s` }}>
              <CountryListItem 
                country={country} 
                onShow={handleShowCountry}
                darkMode={darkMode} 
              />
            </div>
          ))}
        </div>
      )
    }

    // If more than 10 countries, show grid of cards
    if (filteredCountries.length > 10) {
      return (
        <div>
          <div className="mb-6 text-center">
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Too many matches ({filteredCountries.length}). Please be more specific.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCountries.slice(0, 20).map((country, index) => (
              <div
                key={country.cca3 || index}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleShowCountry(country)}
                className="cursor-pointer"
              >
                <CountryCard country={country} darkMode={darkMode} />
              </div>
            ))}
          </div>
          {filteredCountries.length > 20 && (
            <div className="text-center mt-8">
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Showing first 20 of {filteredCountries.length} results
              </p>
            </div>
          )}
        </div>
      )
    }

    // No countries found
    if (filteredCountries.length === 0 && search) {
      return (
        <div className="text-center py-16 animate-fade-in">
          <div className="text-8xl mb-6">🔍</div>
          <h3 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            No countries found
          </h3>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Try searching for "{search}" in a different way
          </p>
        </div>
      )
    }

    // Default: show all countries in grid
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredCountries.slice(0, 50).map((country, index) => (
          <div
            key={country.cca3 || index}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => handleShowCountry(country)}
            className="cursor-pointer"
          >
            <CountryCard country={country} darkMode={darkMode} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-zinc-950 text-white' 
        : 'bg-neutral-50 text-zinc-900'
    }`}>
      
      {/* Clean Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-md transition-colors duration-300 ${
        darkMode ? 'bg-zinc-950/80 border-zinc-800' : 'bg-white/80 border-zinc-200'
      } border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className={`text-2xl font-light tracking-wide ${
              darkMode ? 'text-white' : 'text-zinc-900'
            }`}>
              Countries
            </h1>
            <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </div>
        </div>
      </header>

      {/* Rest of your content with updated classes */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Search */}
        <SearchInput 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          darkMode={darkMode}
        />

        {/* Stats */}
        {!loading && !error && !selectedCountry && (
          <div className="mb-8 text-center">
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {search ? `Found ${filteredCountries.length} countries` : `Exploring ${countries.length} countries`}
            </p>
          </div>
        )}

        {/* Content */}
        {renderContent()}
      </main>
    </div>
  )
}

export default App
