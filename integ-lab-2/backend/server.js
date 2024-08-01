const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3001;

const apiKey = 'ArunmN8U9ApjCoCC22bYPBv9JRasfGFq';

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Weather API is running');
});

app.get('/weather/:city', async (req, res) => {
  const city = req.params.city;
  try {
    const locationUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`;
    const locationResponse = await axios.get(locationUrl);
    const locationData = locationResponse.data;

    if (locationData && locationData.length > 0) {
      const locationKey = locationData[0].Key;
      const weatherUrl = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`;
      const weatherResponse = await axios.get(weatherUrl);
      const weatherData = weatherResponse.data;

      const hourlyUrl = `http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${locationKey}?apikey=${apiKey}`;
      const hourlyResponse = await axios.get(hourlyUrl);
      const hourlyData = hourlyResponse.data;

      const dailyUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}`;
      const dailyResponse = await axios.get(dailyUrl);
      const dailyData = dailyResponse.data.DailyForecasts;

      res.json({
        weather: weatherData[0],
        hourly: hourlyData,
        daily: dailyData,
      });
    } else {
      res.status(404).json({ error: 'City not found.' });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
