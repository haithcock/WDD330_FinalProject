# WDD330_FinalProject


1. Project Overview
Travel Planner Dashboard: Solves the problem of fragmented travel planning by integrating real-time weather forecasts and location intelligence. It targets travelers seeking efficient itinerary planning by centralizing weather data and geographic insights.
Crypto News Aggregator: Addresses information overload in cryptocurrency markets by curating real-time price data and vetted news. Targets crypto investors/traders needing consolidated market intelligence.
Core Opportunity: Both apps eliminate context-switching between tools, saving time and improving decision-making.

2. Target Audience
Travel Planner:
    • Primary: Casual travelers, backpackers, business trippers.
    • Served via: Weather-driven packing suggestions, interactive maps for points of interest, and multi-location forecasts.
Crypto Aggregator:
    • Primary: Retail crypto traders, blockchain enthusiasts.
    • Served via: Customizable news feeds, price alert setups, and trend visualizations.

3. Major Functions
Travel Planner Dashboard
    1. Geolocation Search (OpenCage): Convert user-entered destinations into coordinates for weather mapping.
    2. Real-Time Weather (Weatherstack): Display temperature, humidity, and conditions for a location.
    3. 5-Day Forecast: Visualize upcoming weather with icons/temperature graphs.
    4. Trip Comparison: Side-by-side weather comparisons for 2 destinations.
    5. Packing Suggestions: AI-driven recommendations (e.g., "Bring sunscreen for 30°C").
    6. Interactive Map: Plot weather data on a Leaflet.js map.
    7. Save/Load Trips: Local storage for itinerary reuse.
    8. Weather Alerts: Notifications for severe conditions (storms/floods).
Crypto News Aggregator
    1. Top Coin Tickers (CoinGecko): Real-time prices, 24h changes for top 10 cryptos.
    2. News Search (NewsAPI): Fetch articles by keyword (e.g., "Bitcoin ETF").
    3. Custom Feeds: User-defined filters (e.g., "Ethereum + DeFi").
    4. Price Charts: Interactive 7-day charts using Chart.js.
    5. Bookmarking: Save articles for later reading.
    6. Trend Analysis: Highlight coins with surging search volume.
    7. Mobile Alerts: Browser notifications for price thresholds.
    8. API Sync: Auto-refresh data every 10 minutes.


4. Wireframes

5. External Data Sources

1. For the travel planner we will have the following data:

    • Current temperature, weather descriptions, forecast, geolocation and store these in local storage.

2. For the Crypto News aggregator we will have the following data:

    •  Real time market data such as current price in USD, price change percentage, news titles, article urls, and the date.time of when the article was published.


6. File Structure
Travel Planner:
    • index.html
    • styles/   main.css, weather-icons.css
    • scripts/  app.js, geocoder.js, weather.js, map.js
    • assets/  icons, default location JSON
Crypto Aggregator:
    • index.html
    • styles/  crypto.css, news-cards.css
    • scripts/   app.js, coingecko.js, newsapi.js, charts.js
    • data/   bookmarks.json

7. Design System
    • Color Schemes:
        ◦ Travel Planner: Oceanic blues (#3498DB), sunny yellows (#F1C40F), alpine greens (#2ECC71).
        ◦ Crypto Aggregator: Dark theme (#2C3E50) with crypto accents (#16A085 teal, #F39C12 orange).
    • Typography:
        ◦ Headings: Roboto Condensed (clean readability).
        ◦ Body: Open Sans (neutral for data density).
    • Icons:
        ◦ Travel: FontAwesome weather icons + custom location pins.
        ◦ Crypto: CryptoCurrency Icons library + Material Design alerts.

8. Schedule (Weeks 5–7)
Week 5:
    • Travel Planner: API integrations (Weatherstack/OpenCage), location search UI.
    • Crypto: CoinGecko price table, NewsAPI fetch logic.
    • Deliverables: Functional API data flows, core UI skeletons.
Week 6:
    • Travel Planner: Forecast implementation.
    • Crypto: Bookmarking, chart.js integration.
    • Deliverables: Persistent storage.
Week 7:
    • Travel Planner: Mobile responsiveness.
    • Crypto: Error handeling.
    • Deliverables: Final documentation.

10. Anticipated Challenges
    1. API Rate Limits:
        ◦ Weatherstack (1k calls/month), NewsAPI (100 calls/day). Mitigation: Client-side caching, error fallbacks.
    2. Data Syncing:
        ◦ Coordinating weather/crypto data refreshes without overlapping requests.
    3. Complex UI States:
        ◦ Managing simultaneous API loads (e.g., location search + weather fetch) without UI freezing.
    4. Time Zones:
        ◦ Displaying weather/crypto data in the user’s local time.
    5. Security:
        ◦ Hiding API keys via Netlify environment variables.
