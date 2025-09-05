# Weather Now ☁️

A modern **React + TailwindCSS weather app** that provides **current
weather** and a **5-day forecast** for any city using the [Open-Meteo
API](https://open-meteo.com/).

------------------------------------------------------------------------

## ✨ Features

-   🌍 Search weather by **city name**\
-   ☀️ Dynamic backgrounds depending on weather (Sunny, Cloudy, Rainy,
    Snowy, Foggy)\
-   ❄️ Glassmorphism weather card design\
-   📅 **5-day forecast** with min/max temperatures\
-   📱 Fully responsive (mobile & desktop)\
-   ⚡ Fast & lightweight (Vite + React)

------------------------------------------------------------------------

## 🖼️ Screenshots

### 🌤 Current Weather

![Weather Now - Current Weather](./screenshots/current-weather.png)

### 📅 5-Day Forecast

![Weather Now - Forecast](./screenshots/forecast.png)

*(Replace with your own screenshots after running the app)*

------------------------------------------------------------------------

## 🛠️ Tech Stack

-   **Frontend:** React 19, Vite\
-   **Styling:** TailwindCSS 3\
-   **API:** [Open-Meteo Weather API](https://open-meteo.com/)\
-   **Deployment:** Netlify / Vercel / GitHub Pages

------------------------------------------------------------------------

## 📦 Installation

1.  Clone the repository:

``` bash
git clone https://github.com/<your-username>/weather-now.git
cd weather-now
```

2.  Install dependencies:

``` bash
npm install
```

3.  Run the development server:

``` bash
npm run dev
```

4.  Open in browser:

```{=html}
<!-- -->
```
    http://localhost:5173

------------------------------------------------------------------------

## 🌍 Deployment

### Netlify

1.  Run `npm run build`\
2.  Drag and drop the `dist/` folder into Netlify

### Vercel

1.  Push project to GitHub\
2.  Import repo in [Vercel Dashboard](https://vercel.com/)\
3.  Deploy 🎉

------------------------------------------------------------------------

## 📖 API References

-   **Geocoding API**:

        https://geocoding-api.open-meteo.com/v1/search?name={city}

-   **Weather API (current):**

        https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true

-   **Weather API (5-day forecast):**

        https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&forecast_days=5&timezone=auto

------------------------------------------------------------------------

## 🚀 Future Enhancements

-   🌡 Hourly forecast view\
-   🕒 Save recent searches\
-   🌎 Multi-language + Unit conversion (°C ↔ °F)\
-   🎨 Animated weather icons instead of emojis

------------------------------------------------------------------------

## 👨‍💻 Author

**Your Name**\
- GitHub: [@your-username](https://github.com/your-username)\
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-linkedin)

