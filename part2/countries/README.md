# Countries Explorer 🌍

A modern, responsive web application for exploring detailed information about countries worldwide. Built with React and powered by REST APIs for real-time data.

## 🚀 Live Demo

**[View Live Application](https://country-explorer0101.vercel.app/)**

## ✨ Features

- **Smart Search**: Intelligent filtering with dynamic UI rendering
  - 1 result → Detailed country view
  - 2-10 results → List view with action buttons  
  - 10+ results → Grid view with cards
- **Comprehensive Data**: Population, geography, languages, currencies, and more
- **Real-time Weather**: Current weather information for capital cities
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Responsive Design**: Optimized for all device sizes
- **Modern UI**: Clean, minimal design with smooth animations

## 🛠️ Tech Stack

- **Frontend**: React 18, JavaScript ES6+
- **Styling**: Tailwind CSS with custom color palette
- **APIs**: REST Countries API, WeatherAPI
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Deployment**: Vercel

## 🎯 Key Functionality

### Smart Search Logic
```javascript
// Dynamic rendering based on search results
if (filteredCountries.length === 1) {
  // Show detailed country view
} else if (filteredCountries.length <= 10) {
  // Show list with "Show Details" buttons
} else {
  // Show grid of country cards
}
```
