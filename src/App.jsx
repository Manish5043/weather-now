import { useState } from "react";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);
    setWeather(null);
    setForecast(null);

    try {
      // Step 1: Get coordinates from city name
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("City not found");
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // Step 2: Get current weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      setWeather({
        city: name,
        country,
        ...weatherData.current_weather,
      });

      // Step 3: Get 5-day forecast
      const forecastRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&forecast_days=5&timezone=auto`
      );
      const forecastData = await forecastRes.json();

      setForecast(forecastData.daily);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (code) => {
    if ([0].includes(code)) return "☀️"; // Clear
    if ([1, 2, 3].includes(code)) return "☁️"; // Cloudy
    if ([45, 48].includes(code)) return "🌫️"; // Fog
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "🌧️"; // Rain
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "❄️"; // Snow
    return "🌍";
  };

  const getBackground = (code) => {
    if (!code) return "from-indigo-400 via-sky-400 to-cyan-300";
    if ([0].includes(code)) return "from-yellow-300 via-orange-400 to-pink-500"; // Sunny
    if ([1, 2, 3].includes(code)) return "from-gray-300 via-gray-500 to-gray-700"; // Cloudy
    if ([45, 48].includes(code)) return "from-gray-400 via-slate-600 to-slate-800"; // Fog
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code))
      return "from-blue-400 via-blue-600 to-indigo-800"; // Rain
    if ([71, 73, 75, 77, 85, 86].includes(code))
      return "from-blue-100 via-sky-200 to-white"; // Snow
    return "from-indigo-400 via-sky-400 to-cyan-300";
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-r ${getBackground(
        weather?.weathercode
      )}`}
    >
      <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-10 tracking-wide">
        Weather Now ☁️
      </h1>

      {/* Search Bar */}
      <div className="flex w-full max-w-lg mb-10 shadow-lg rounded-2xl overflow-hidden">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="flex-1 p-4 text-lg border-none outline-none"
        />
        <button
          onClick={fetchWeather}
          className="px-6 py-4 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all"
        >
          Search
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <p className="text-white text-lg animate-pulse">Fetching weather...</p>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-red-700 bg-white px-4 py-2 rounded-xl shadow-lg">
          {error}
        </p>
      )}

      {/* Current Weather Card */}
      {weather && !loading && !error && (
        <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-8 text-center w-96 text-white mb-8">
          <div className="text-7xl mb-4 drop-shadow-lg">
            {getIcon(weather.weathercode)}
          </div>
          <h2 className="text-3xl font-bold mb-4 tracking-wide">
            {weather.city}, {weather.country}
          </h2>
          <div className="flex justify-between text-lg font-medium">
            <p>🌡 Temp: {weather.temperature}°C</p>
            <p>💨 Wind: {weather.windspeed} km/h</p>
          </div>
          <p className="mt-3 text-md opacity-90">
            Wind Dir: {weather.winddirection}°
          </p>
        </div>
      )}

      {/* 5-Day Forecast */}
      {forecast && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full max-w-4xl">
          {forecast.time.map((date, i) => (
            <div
              key={date}
              className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg p-4 text-center text-white"
            >
              <p className="font-semibold mb-2">
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </p>
              <div className="text-3xl mb-2">{getIcon(forecast.weathercode[i])}</div>
              <p className="text-sm">
                {forecast.temperature_2m_min[i]}°C /{" "}
                {forecast.temperature_2m_max[i]}°C
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
