import logo from './logo.svg';
import './App.css';
import UserForm from './components/Form'
import NewUser from './components/User'
import React, { useState, useEffect } from 'react'
import axios from '../node_modules/axios'

const initialFormValues = {
  name: '',
  email: '',
  password: '',
}

function App() {
  const [user, setUser] = useState([])

  const [formValues, setFormValues] = useState(initialFormValues)

  const updateForm = (inputName, inputValue) => {
    setFormValues({ ...formValues, [inputName]: inputValue})
  }

  const submitForm = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim()
    }
    if (!newUser.name || !newUser.email || !newUser.password) return
    axios.post('https://reqres.in/api/users', newUser)
      .then(res => {
        const userFromBackend = res.data
        setUser([userFromBackend, ...user])
        setFormValues(initialFormValues)
      })
  }

  useEffect(() => {
    axios.get('https://reqres.in/api/users').then(res => setUser(res.data))
  }, [])

  return (
    <div className="App">
      <h1>User Onboarding</h1>

      <UserForm 
        submit={submitForm}
        update={updateForm}
        values={formValues}
      />

      {/* {
        user.map(user => {
          return (
            <NewUser key={user.id} details={user} />
          )
        })
      } */}


    </div>
  );
}

export default App;
