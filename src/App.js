import React, { useState } from 'react';
import axios from 'axios';

const apiEndpoint = {
  //insert your private key down
  key: "",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {
  const [request, setRequest] = useState('');
  const [weather, setWeather] = useState({});

  const searchHandler = async (evt) => {
    if (evt.key === "Enter") {
      try {
        const { data: result } = await axios.get(`${apiEndpoint.base}weather?q=${request}&units=metric&APPID=${apiEndpoint.key}`)
        setWeather(result)
        setRequest('');

      }
      catch (ex) {
        alert('Un unexpected error occured...');
      }

    }
  }

  const dateMaker = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "saturday"];
    let date = d.getDate();
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }


  return (
    <div className={
      (typeof weather.main != "undefined") ?
        ((weather.main.temp > 14 && weather.weather[0].main != "Clouds") ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className='search-box'>
          <input
            type="text"
            className='search-bar'
            placeholder='Search...'
            onChange={e => setRequest(e.target.value)}
            value={request}
            onKeyPress={searchHandler}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <>
            <div className='location-box'>
              <div className='location'>{weather.name}, {weather.sys.country}</div>
              <div className='date'>{dateMaker(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>{Math.round(weather.main.temp) + ' C°'}</div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </>
        ) : ('')}
      </main>
    </div >
  );
}
export default App;
