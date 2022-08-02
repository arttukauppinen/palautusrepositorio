import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  return(<p>{country.name.common}</p>)
}

const Languages = ({ country }) => {
  const a = Object.values(country.languages)
  return (
    <div>
      <h3>languages</h3>
      <ul>
        {a.map(language =>
          <li key={language}>
            {language}
          </li>)}
      </ul>
    </div>
  )
}

const Flag = ({ country }) =>{
  return(
    <div>
      <font size="7">{country.flag}</font>
    </div>
  )
}

const Specifics = ({ country }) => {
  return(
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p><p>area {country.area}</p>
      <Languages country={country}/>
      <Flag country={country}/>
    </div>
  )
}

const Show = ({ filter, countries }) =>{
  const _countries = countries.filter(a => a.name.common.toLowerCase().includes(filter.toLowerCase()))

  if(_countries.length === 1) return (<Specifics country={_countries[0]}/>)
  else if(_countries.length < 10){
    return(
    <div>
      {_countries.map(country => 
        <Country key={country.name.common} country={country}/>
      )}
    </div>)
  }else return(<div>Too many matches, specify another filter</div>)
}

const Filter = ({ filter, handler }) => {
  return(
    <div>find countries
      <input value={filter} onChange={handler}/>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')

        setCountries(response.data)
      })
  }
  
  useEffect(hook, [])

  const handleFilter = (event) => setFilter(event.target.value)

  return (
    <div>
      <Filter filter={newFilter} handler={handleFilter}/>
      <Show filter={newFilter} countries={countries}/>
    </div>
  )

}

export default App