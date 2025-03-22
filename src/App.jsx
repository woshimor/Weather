import { useEffect, useState } from "react"
import {IconButton, TextField, Typography, Grid} from "@mui/material"
import "./App.css"
import {FiSearch} from "react-icons/fi"
import sunnyImg from "./assets/images/sunny.jpg"
import rainImg from "./assets/images/rain.jpg"
import cloudImg from "./assets/images/cloud.jpg"
import axios from "axios"

const App = () => {
  const[weatherData, setWeatherData] = useState(null)
  const[city, setCity] = useState('tokyo')
  const[errorMsg, setErrorMsg] = useState('')


  const fetchWeather = () => {
    axios(
      `https://api.openweathermap.org/data/2.5/weather?appid=dbaaa8e077ed7d00df441b95fe6f5392&q=${city}&units=metric`
    )
    .then((response) =>{
      setWeatherData(response.data)
      setCity("")
      setErrorMsg("")
    })
    .catch((err) =>{
       console.error(err)
       setErrorMsg(err.response.data.message)
       setWeatherData(null)
    })
  }

  const onSubmit = (e) =>{
    e.preventDefault()
    fetchWeather()
  }


  const searchHendler = (e) => {
     setCity(e.target.value)
  }
  
  const setImg = () => {
    if (!weatherData) return sunnyImg
    switch (weatherData.weather[0].main) {
      case "Rain":
        return rainImg
    
      case "Sunny":
        return sunnyImg

      case "Clouds":
        return cloudImg
    
      default:
        return sunnyImg
    }
  }

  useEffect(() => {
    fetchWeather()
  }, [])

  return (
    <div className="app-container" style={{
      background: `URL(${setImg()})`,
      }}>
      <div className="app">
        <Typography textAlign="center" variant="h1" fontSize={48} color="#fff">Weather</Typography>
        <form className="form" onSubmit={onSubmit}>
          <div className="search-box">
            <TextField 
              label="search city" 
              type="text" 
              onChange={searchHendler} 
              color="primary"
              fullWidth
              value={city}
            />
            <IconButton 
             className="search__btn" 
             variant="contained" 
             type="submit"
            >
             <FiSearch/>
            </IconButton>
          </div>
        </form>
        {weatherData?(
            <div className="forecast">
              <Grid container flex='row' justifyContent='space-between'>
               <Typography variant="h5">City:</Typography>
               <Typography variant="h5">{weatherData.name}</Typography>
              </Grid>
              <Grid container flex='row' justifyContent='space-between'>
               <Typography variant="h5">Temperature:</Typography>
               <Typography variant="h5">{Math.round(weatherData.main.temp)}°C</Typography>
              </Grid>
              <Grid container flex='row' justifyContent='space-between'>
               <Typography variant="h5">Feels like:</Typography>
               <Typography variant="h5">{Math.round(weatherData.main.feels_like)}°C</Typography>
              </Grid>
            </div>
        ) : null}
        {errorMsg ? <p>{errorMsg}</p> : null}
      </div>
    </div>
  )
}
export default App
