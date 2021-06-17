import React, { useState } from "react";
import DisplayWeather from "./DisplayWeather";

function Weather() {
  const [weather, setWeather] = useState([]);
  const [form, setForm] = useState({
    city: "",
    country: "",
  });

  const APIKEY = "784351a87e6beb1e7c2055b3d97b26a7";

  //
  async function weatherData(e) {
    e.preventDefault();
    if (form.city == "") {
      alert("Add values");
    } else {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&APPID=${APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => data);

      setWeather({ data: data });
      console.log(data.cod);
    }
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name == "city") {
      setForm({ ...form, city: value });
    }
    if (name == "country") {
      setForm({ ...form, country: value });
    }
  };
  return (
    <div className="weather">
      <div className="title">
        <h1>Weather App</h1>
        <div className="underline"></div>
      </div>

      <div className="container-form">
        <form>
          <input
            type="text"
            placeholder="City .."
            name="city"
            onChange={(e) => handleChange(e)}
          />

          <input
            type="text"
            placeholder="Country"
            name="country"
            onChange={(e) => handleChange(e)}
          />
          <button className="getweather" onClick={(e) => weatherData(e)}>
            Submit
          </button>
        </form>
      </div>

      {weather.data != undefined ? (
        <DisplayWeather data={weather.data} />
      ) : null}
    </div>
  );
}

export default Weather;
