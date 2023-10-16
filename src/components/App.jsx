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
const [error, setError] = useState("");

const newCountry = {
  id: "",
  name: "",
  capital: "",
  continent: "",
  flag: ""
}

const [addNewCountry, setAddNewCountry] = useState(newCountry)



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
            continent:country.continents[0],
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

const handleForm = (ev) => {
  ev.preventDefault();
}

const handleInputAdd = (ev) => {
  setAddNewCountry({ ...addNewCountry, [ev.target.id]: ev.target.value });
}

const handleClick = () => {   // renderiza el nuevo contacto
  if(addNewCountry.name === "" ||
    addNewCountry.capital === "" ||
    addNewCountry.continent === "" ||
    addNewCountry.flag === ""){
      setError('Debe rellenar nombre y apellido')
  } else {
      setCountries([addNewCountry, ...countries])
      setError('')
      setAddNewCountry({newCountry})
  }
}

// render
const renderCountries = () => {
  let filteredCountries = countries;
    
    return filteredCountries
      .filter(country => country.name.toLowerCase().includes(countryNameSearch.toLowerCase()))
      .filter(country => continentSearch !== 'all' ? country.continent.toLowerCase().includes(continentSearch.toLowerCase()) : true)
      .map(country => (
        <li key={country.id}>
          <p className="img">{country.flag}</p>
          <h2>{country.name}</h2>
          <h3>{country.capital}</h3>
          <h3>{country.continent}</h3>
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

      <h3>Add Country</h3>
      <form onSubmit={handleForm}>
        <input
           type="text"
           name="nameCountry"
           id="name"
           placeholder="Country Name"
           onChange={handleInputAdd}
           value={addNewCountry.name}
        />
        <input
           type="text"
           name="capitalCountry"
           id="capital"
           placeholder="Country Capital"
           onChange={handleInputAdd}
           value={addNewCountry.capital}
        />
        <input
           type="text"
           name="capitalCountry"
           id="continent"
           placeholder="Country Continent"
           onChange={handleInputAdd}
           value={addNewCountry.continent}
        />
        <input
           type="text"
           name="flagCountry"
           id="flag"
           placeholder="Country Flag"
           onChange={handleInputAdd}
           value={addNewCountry.flag}
        />
        <input type="submit" value="Añadir" onClick={handleClick} />
        <p>{error}</p>
      </form>

      <select name="continent" value={continentSearch} onChange={handleChangeContinent}>
        <option value="all">All</option>
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
