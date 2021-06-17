import './App.css';
import UserForm from './components/Form'
import NewUser from './components/User'
import React, { useState, useEffect } from 'react'
import axios from '../node_modules/axios'
import * as yup from 'yup'
import schema from './validation/formSchema'

const initialFormValues = {
  first_name: '',
  email: '',
  password: '',
}

const initialFormErrors = {
  first_name: '',
  email: '',
  password: '',
}

const initialUsers = []
const initialDisabled = true

function App() {
  const [users, setUsers] = useState(initialUsers)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)


  const getUsers = () => {
    axios.get('https://reqres.in/api/users')
      .then(res => {
        setUsers([...res.data.data])
        console.log(...res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const postNewUser = newUser => {
    axios.post('https://reqres.in/api/users', newUser)
      .then(res => {
        setUsers([ ...users, res.data ])
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setFormValues(initialFormValues)
      })
  }

  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: ''}))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
  }

  const inputChange = (name, value) => {
    validate(name, value)
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const submitForm = () => {
    const newUser = {
      name: formValues.first_name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim()
    }
    postNewUser(newUser)
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  return (
    <div className="container">
      <h1>User Onboarding</h1>

      <UserForm 
        values={formValues}
        submit={submitForm}
        change={inputChange}
        disabled={disabled}
        errors={formErrors}
      />

      {
        users.map(user => (
          <NewUser
            key={user.id}
            details={user}
          />
          )
        )
      }
      
    </div>
  );
}

export default App;
