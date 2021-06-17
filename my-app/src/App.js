import './App.css';
import UserForm from './components/Form'
import NewUser from './components/User'
import React, { useState, useEffect } from 'react'
import axios from '../node_modules/axios'
import * as yup from 'yup'
import schema from './validation/formSchema'

const initialFormValues = {
  name: '',
  email: '',
  password: '',
}

const initialFormErrors = {
  username: '',
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
    axios.get('http://buddies.com/api/friends')
      .then(res => {
        setUsers(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  console.log(getUsers)

  const postNewUser = newUser => {
    axios.post('http://buddies.com/api/friends', newUser)
      .then(res => {
        setUsers([res.data, ...users])
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
      name: formValues.name.trim(),
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
        change={inputChange}
        disabled={disabled}
        errors={formErrors}
        submit={submitForm}
      />

      {
        users.map((user, idx) => {
          return (
            <NewUser key={user.id} details={user} />
          )
        })
      }
    </div>
  );
}

export default App;
