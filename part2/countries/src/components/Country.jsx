import Weather from './Weather'

const Country = ({ filtered, darkMode }) => {
  const country = filtered[0]
  
  return (
    <div className="animate-fade-in">
      {/* Clean Header with flag and name */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 mb-12">
        <div className="relative group">
          <img 
            src={country.flags?.svg || country.flags?.png} 
            alt={`Flag of ${country.name.common}`} 
            className="w-full lg:w-80 h-48 lg:h-52 object-cover rounded-lg shadow-sm
              transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
        
        <div className="flex-1 space-y-6">
          <div>
            <h1 className={`text-4xl lg:text-5xl font-light mb-3 ${
              darkMode ? 'text-white' : 'text-zinc-900'
            }`}>
              {country.name.common}
            </h1>
            
            {country.name.official !== country.name.common && (
              <p className={`text-lg ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {country.name.official}
              </p>
            )}
          </div>

          {/* Minimal Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <QuickStat 
              label="Capital" 
              value={country.capital?.[0] || 'N/A'} 
              darkMode={darkMode} 
            />
            <QuickStat 
              label="Population" 
              value={country.population?.toLocaleString() || 'N/A'} 
              darkMode={darkMode} 
            />
            <QuickStat 
              label="Region" 
              value={country.region || 'N/A'} 
              darkMode={darkMode} 
            />
            <QuickStat 
              label="Area" 
              value={`${country.area?.toLocaleString()} km²` || 'N/A'} 
              darkMode={darkMode} 
            />
          </div>
        </div>
      </div>

      {/* Clean Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
        
        {/* Geographic Info */}
        <InfoCard title="Geographic" darkMode={darkMode}>
          <div className="space-y-4">
            <InfoRow label="Region" value={country.region} darkMode={darkMode} />
            <InfoRow label="Subregion" value={country.subregion || 'N/A'} darkMode={darkMode} />
            <InfoRow label="Capital" value={country.capital?.[0] || 'N/A'} darkMode={darkMode} />
            <InfoRow label="Area" value={`${country.area?.toLocaleString()} km²`} darkMode={darkMode} />
            <InfoRow label="Landlocked" value={country.landlocked ? 'Yes' : 'No'} darkMode={darkMode} />
          </div>
        </InfoCard>

        {/* Demographics */}
        <InfoCard title="Demographics" darkMode={darkMode}>
          <div className="space-y-4">
            <InfoRow label="Population" value={country.population?.toLocaleString()} darkMode={darkMode} />
            <InfoRow label="Density" value={`${Math.round(country.population / country.area)} per km²`} darkMode={darkMode} />
            {country.gini && (
              <InfoRow label="Gini Index" value={Object.values(country.gini)[0]} darkMode={darkMode} />
            )}
            <InfoRow label="Drives on" value={country.car?.side === 'right' ? 'Right' : 'Left'} darkMode={darkMode} />
          </div>
        </InfoCard>

        {/* Languages */}
        <InfoCard title="Languages" darkMode={darkMode} className="xl:col-span-1 lg:col-span-2">
          <div className="flex flex-wrap gap-2">
            {Object.values(country.languages ?? {}).map((lang, i) => (
              <LanguageTag key={i} language={lang} darkMode={darkMode} />
            ))}
          </div>
        </InfoCard>
      </div>

      {/* Secondary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        
        {/* Currencies */}
        <InfoCard title="Currencies" darkMode={darkMode}>
          <div className="space-y-3">
            {Object.entries(country.currencies ?? {}).map(([code, curr]) => (
              <CurrencyCard key={code} code={code} currency={curr} darkMode={darkMode} />
            ))}
          </div>
        </InfoCard>

        {/* Additional Info */}
        <InfoCard title="Additional" darkMode={darkMode}>
          <div className="space-y-4">
            {country.tld && (
              <InfoRow label="Domain" value={country.tld.join(', ')} darkMode={darkMode} />
            )}
            {country.idd && (
              <InfoRow label="Calling Code" value={`${country.idd.root}${country.idd.suffixes?.[0] || ''}`} darkMode={darkMode} />
            )}
            <InfoRow label="UN Member" value={country.unMember ? 'Yes' : 'No'} darkMode={darkMode} />
            <InfoRow label="Independent" value={country.independent ? 'Yes' : 'No'} darkMode={darkMode} />
          </div>
        </InfoCard>
      </div>

      {/* Weather */}
      <InfoCard title="Weather" darkMode={darkMode} className="mb-0">
        <Weather capital={country.capital?.[0]} darkMode={darkMode} />
      </InfoCard>
    </div>
  )
}

// Minimal Helper Components
const QuickStat = ({ label, value, darkMode }) => (
  <div className={`p-4 rounded-lg border transition-colors duration-200 ${
    darkMode 
      ? 'bg-zinc-900 border-zinc-800' 
      : 'bg-white border-zinc-200'
  }`}>
    <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
      {label}
    </p>
    <p className={`text-lg font-light ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
      {value}
    </p>
  </div>
)

const InfoCard = ({ title, children, darkMode, className = '' }) => (
  <div className={`p-6 rounded-lg border transition-colors duration-200 ${
    darkMode 
      ? 'bg-zinc-900 border-zinc-800' 
      : 'bg-white border-zinc-200'
  } ${className}`}>
    <h3 className={`text-lg font-medium mb-5 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
      {title}
    </h3>
    {children}
  </div>
)

const InfoRow = ({ label, value, darkMode }) => (
  <div className="flex justify-between items-center">
    <span className={`font-medium ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
      {label}
    </span>
    <span className={`text-right font-light ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
      {value}
    </span>
  </div>
)

const LanguageTag = ({ language, darkMode }) => (
  <span className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
    darkMode 
      ? 'bg-blue-900/30 text-blue-300 border border-blue-800' 
      : 'bg-blue-50 text-blue-700 border border-blue-200'
  }`}>
    {language}
  </span>
)

const CurrencyCard = ({ code, currency, darkMode }) => (
  <div className={`p-3 rounded border ${
    darkMode 
      ? 'bg-zinc-800 border-zinc-700' 
      : 'bg-zinc-50 border-zinc-200'
  }`}>
    <div className="flex justify-between items-center mb-1">
      <span className={`font-medium ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
        {currency.name}
      </span>
      <span className={`text-xs px-2 py-1 rounded ${
        darkMode ? 'bg-zinc-700 text-zinc-300' : 'bg-zinc-200 text-zinc-600'
      }`}>
        {code}
      </span>
    </div>
    <div className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
      {currency.symbol || '—'}
    </div>
  </div>
)

export default Country