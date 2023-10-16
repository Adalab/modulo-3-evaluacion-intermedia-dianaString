//imports dependencias, imagenes, componentes, stylos
import { useEffect, useState } from "react";
// import ls from "../services/localStorage";
import '../styles/App.scss'


function App() {

// Variables
const LINK = "https://restcountries.com/v3.1/all?fields=name,capital,flag,continents,cca2";

const [countries, setCountries] = useState ([])
const [countryNameSearch, setCountryNameSearch] = useState ("")
const [continentSearch, setContinentSearch] = useState ("")

//fetch
useEffect(() => {
  fetch(LINK)
    .then(response => response.json())
    .then(dataApi => {
      const cleanData = dataApi.map(country =>{
        const newObject = {
            id: country.cca2,
            name: country.name.official,
            capital: country.capital[0],
            continents:country.continents[0],
            flag: country.flag
          }
          return newObject
        })
      // console.log(cleanData)
      setCountries(cleanData)
    })
},[]);

// handlers
const handleChangeCountryName = (ev) => {
  console.log(ev.target.value)
  setCountryNameSearch(ev.target.value)
}

const handleChangeContinent = (ev) => {
  console.log(ev.target.value)
  setContinentSearch(ev.target.value)
}

const handleDeleteCountry = (id) => {
  const updatedCountries = countries.filter(country => country.id !== id);
  setCountries(updatedCountries);
};

// render
const renderCountries = () => {
  let filteredCountries = countries;
    
    return filteredCountries
      .filter(country => country.name.toLowerCase().includes(countryNameSearch.toLowerCase()))
      .filter(country => continentSearch !== 'all' ? country.continents.toLowerCase().includes(continentSearch.toLowerCase()) : true)
      .map(country => (
        <li key={country.id}>
          <p className="img">{country.flag}</p>
          <h2>{country.name}</h2>
          <h3>{country.capital}</h3>
          <h3>{country.continents}</h3>
          <button onClick={() => handleDeleteCountry(country.id)}>delete</button>
        </li>
      ))
}

 
// html
  return (
    <>
      <h1>Country Info App</h1>
      <h2>Explore information about contries, capitals and flags. Add new countries and filter throught the list!</h2>

      <h3>Filters</h3>
      <h4>By Country</h4>
      <input 
        type="text"
        name="country"
        value={countryNameSearch}
        onChange={handleChangeCountryName} />
      <h4>By Continent</h4>

      {/* <h3>Add Country</h3>
      <input type="text" placeholder="Country Name" value={newCountry.name} /> */}

      <select name="continent" value={continentSearch} onChange={handleChangeContinent}>
        <option value="all" selected>All</option>
        <option value="asia">Asia</option>
        <option value="antarctica">Antarctica</option>
        <option value="europe">Europe</option>
        <option value="africa">Africa</option>
        <option value="north america">North America</option>
        <option value="south america">South America</option>
        <option value="oceania">Oceania</option>
      </select>
      <ul>
        {renderCountries()}
      </ul>
    </>
  )
}

export default App
