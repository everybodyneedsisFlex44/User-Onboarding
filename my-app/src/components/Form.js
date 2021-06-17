import React from 'react'

export default function UserForm(props) {
    const { 
        values, 
        change, 
        submit,
        disabled,
        errors, 
    } = props

    const onChange = evt => {
        const { name, value } = evt.target
        change(name, value)
    }

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }

    return (
        <form className='form container' onSubmit={onSubmit}>
            <div className='form-group inputs'>
                <h2>Add a User</h2>
                
                <label>Name:
                    <input
                        type='text'
                        name='name'
                        placeholder='Enter Name...'
                        onChange={onChange}
                        value={values.name}
                    />
                </label>
                <label>Email:
                    <input
                        type='email'
                        name='email'
                        onChange={onChange}
                        value={values.email}
                    />
                </label>
                <label>Password:
                    <input
                        type='password'
                        name='password'
                        onChange={onChange}
                        value={values.password}
                    />
                </label>

                <div className='submit'>
                    <button disabled={disabled}>submit</button>
                    <div className='errors'>
                        <div>{errors.username}</div>
                        <div>{errors.email}</div>
                        <div>{errors.password }</div>
                    </div>
                </div>
            </div>
        </form>
    )

}