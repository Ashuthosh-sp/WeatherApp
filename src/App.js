import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [query, setQuery] = useState("");
  const [cond, setCond] = useState([]);
  const url = `http://api.weatherstack.com/current?access_key=cdf62a7f14b0bb691e2d7e0cd45d0666&query=${query}`;
  async function getdata() {
    const result = await axios.get(url);
    setCond([result.data]);
    console.log(result.data);
  }
  const submitForm = (e) => {
    e.preventDefault();
    getdata();
  };
  return (
    <div className="App">
      <form onSubmit={submitForm} className="form">
        <input
          type="text"
          placeholder="Enter the place"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Enter</button>
      </form>
      {cond.map((item, index) => {
        return (
            <div key={index} className="item">
            <div className="place">
              <img src={item.current.weather_icons} alt=""></img>
              <p>{item.location.country}</p>
              <p>{item.location.region}</p>

            <div className="condition">
              <p><span> Time :</span> :{item.current.observation_time}</p>
              <p><span> Temperature :</span> : {item.current.temperature}</p>
              <p><span> Pressure :</span> :  {item.current.pressure}</p>
              <p><span> Wind Degree</span> :{item.current.wind_degree} </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default App;
