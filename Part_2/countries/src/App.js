import React, { useEffect, useState } from "react";
import axios from "axios";

const Country = ({ country }) => {
  const [weather, setWeather] = useState([]);
  useEffect(() => {
    const params = {
      access_key: "00139b2518cd79d492ac5a9ed331c340",
      query: country.capital,
    };
    console.log(
      axios
        .get("https://api.weatherstack.com/current", params)
        .then((res) => console.log(res))
    );
  });

  return <div>{country.name}</div>;
};

const Display = ({ countries, searchinput, setsearchinput }) => {
  const countriesToDisplay = countries
    ? countries.filter((country) => {
        return country.name.toLowerCase().includes(searchinput.toLowerCase());
      })
    : [];

  if (!searchinput) return <div>Search a country</div>;
  if (countriesToDisplay.length >= 10) {
    return <div>Too many results, enter a specific country name</div>;
  } else if (countriesToDisplay.length < 10 && countriesToDisplay.length > 1) {
    return countriesToDisplay.map((country) => {
      console.log(country);
      return (
        <>
          <div>{country.name}</div>
          <button onClick={() => setsearchinput(country.name)}>Show</button>
        </>
      );
    });
  } else if (countriesToDisplay.length === 1) {
    return <Country country={countriesToDisplay[0]} />;
  } else {
    return <div> enter valid country name</div>;
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [inputcountry, setInputcountry] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      setCountries(res.data);
    });

    console.log(countries);
  }, []);

  return (
    <>
      <label htmlFor="">Find Countries</label>
      <input
        type="text"
        value={inputcountry}
        onChange={(e) => setInputcountry(e.target.value)}
      />
      <Display
        countries={countries}
        searchinput={inputcountry}
        setsearchinput={setInputcountry}
      />
    </>
  );
};

export default App;
