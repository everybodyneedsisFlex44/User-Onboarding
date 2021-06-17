import React from 'react'

export default function NewUser({ details }) {
  // if (!details) {
  //   return <h3>Working fetching your User's details...</h3>
  // }

  return (
    <div className='friend container'>
      <h2>{details.first_name}</h2>
      <p>Email: {details.email}</p>
      <p>Password: {details.password}</p>
    </div>
  )
}