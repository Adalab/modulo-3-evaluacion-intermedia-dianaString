//imports dependencias, imagenes, componentes, stylos
import { useEffect, useState } from "react";
// import ls from "../services/localStorage";
import '../styles/App.scss'


function App() {

// Variables
const LINK = "https://restcountries.com/v3.1/all?fields=name,capital,flag,continents,cca2";

const [countries, setCountries] = useState ([])

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
       console.log(cleanData)
      setCountries(cleanData)
    })
},[]);
 
//html
  return (
    <>
      <h1>Country Info App</h1>
      <h2>Explore information about contries, capitals and flags. Add new countries and filter throught the list!</h2>
      <ul>
        {countries.map(country => (
          <li key={country.id}>
            <img src={country.flag} alt={country.name} />
            <p>{country.flag}</p>
            <h2>{country.name}</h2>
            <h3>{country.capital}</h3>
            <h3>{country.continents}</h3>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
