import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import persons from './services/persons'
import './index.css'

const Person = ({ person, filter, deletePerson }) => {
  console.log(person.id + "eyes")
  return(
    person.name.toLowerCase().includes(filter.toLowerCase())
      ?(<p>
          {person.name} {person.number + "    "}
           <button onClick={deletePerson}>delete</button>
        </p>
      )
      :""
  )
}

const Filter = ({ filter, handler }) => {
  return(
    <div>filter shown with
      <input value={filter} onChange={handler}/>
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('')


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const change = (personObject) => {
    if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
      const person = persons.find(person => person.name == personObject.name)
      console.log(person + "found person???")

      const khaled = persons.filter(p => p.id != person.id)
      setPersons(khaled)

      personService
        .update(person.id, personObject).then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
        }).then(()=>{
            setErrorMessage(`'${personObject.name}' changed`);
            setTimeout(()=>{setErrorMessage(null)}, 5000)
        })
    }
  }


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    persons.some(o => o.name === newName)
      ? change(personObject)
      : personService
        .create(personObject)
          .then(returnedPersons => {
            setPersons(persons.concat(returnedPersons));
            setErrorMessage(`'${personObject.name}' added`);
            setTimeout(()=>{setErrorMessage(null)}, 5000)
      })
  }

  const deletePerson = (person) => {
    if (window.confirm(`delete ${person.name}?`)) {

      const khaled = persons.filter(p => p.id != person.id)
      setPersons(khaled)
      personService.deletion(person.id)
      setErrorMessage(`'${person.name}' deleted`);
      setTimeout(()=>{setErrorMessage(null)}, 5000)
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook☎️</h2>
      <Notification message={errorMessage} />
      <Filter filter={newFilter} handler={handleFilter}/>
      
      <h3>add a new</h3>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange }/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>

      <h3>Numbers</h3>
      <ul>
        {persons.map(person =>       
            <Person key={person.name}
                    person={person} 
                    filter={newFilter}
                    deletePerson={() => deletePerson(person)}
            />
        )}
      </ul>
    </div>
  )

}

export default App