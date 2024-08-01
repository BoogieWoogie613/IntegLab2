import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Card, CardContent, Typography, Grid, Alert } from '@mui/material';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [error, setError] = useState(null);

  const getWeather = async (city) => {
    try {
      const response = await axios.get(`http://localhost:3001/weather/${city}`);
      const data = response.data;

      setWeather(data.weather);
      setHourlyData(data.hourly);
      setDailyData(data.daily);
      setError(null);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Error fetching weather data.');
      setWeather(null);
      setHourlyData([]);
      setDailyData([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather(city);
  };

  return (
    <Container className="App" maxWidth="sm">
      <Typography variant="h3" component="h1" gutterBottom>
        Weather App
      </Typography>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          label="Enter city name"
          variant="outlined"
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
          Get Weather
        </Button>
      </form>
      {error && <Alert severity="error" className="my-4">{error}</Alert>}
      {weather && (
        <Card className="my-4">
          <CardContent>
            <Typography variant="h5">Current Weather</Typography>
            <Typography variant="body1">Temperature: {weather.Temperature.Metric.Value}°C</Typography>
            <Typography variant="body1">Weather: {weather.WeatherText}</Typography>
            <Typography variant="body1">Date: {weather.LocalObservationDateTime}</Typography>
            <img
              src={`https://developer.accuweather.com/sites/default/files/${weather.WeatherIcon.toString().padStart(2, '0')}-s.png`}
              alt={weather.WeatherText}
              className="weather-icon"
            />
          </CardContent>
        </Card>
      )}
      {hourlyData.length > 0 && (
        <Card className="my-4">
          <CardContent>
            <Typography variant="h5">Hourly Weather</Typography>
            <Grid container spacing={2}>
              {hourlyData.map((hour, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="body1">Time: {new Date(hour.DateTime).toLocaleString()}</Typography>
                      <Typography variant="body1">Temperature: {hour.Temperature.Value}°C</Typography>
                      <Typography variant="body1">Condition: {hour.IconPhrase}</Typography>
                      <img
                        src={`https://developer.accuweather.com/sites/default/files/${hour.WeatherIcon.toString().padStart(2, '0')}-s.png`}
                        alt={hour.IconPhrase}
                        className="weather-icon"
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}
      {dailyData.length > 0 && (
        <Card className="my-4">
          <CardContent>
            <Typography variant="h5">5-Day Forecast</Typography>
            <Grid container spacing={2}>
              {dailyData.map((day, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="body1"><strong>Date:</strong> {new Date(day.Date).toLocaleDateString()}</Typography>
                      <Typography variant="body1"><strong>Condition:</strong> {day.Day.IconPhrase}</Typography>
                      <img
                        src={`https://developer.accuweather.com/sites/default/files/${day.Day.Icon.toString().padStart(2, '0')}-s.png`}
                        alt={day.Day.IconPhrase}
                        className="weather-icon"
                      />
                      <Typography variant="body1"><strong>Max Temp:</strong> {day.Temperature.Maximum.Value}°C</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default App;
