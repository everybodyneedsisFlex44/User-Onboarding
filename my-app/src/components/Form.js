import React from 'react'

export default function UserForm(props) {
    const { values, update, submit } = props

    const onChange = evt => {
        const { name, value } = event.target
        update(name, value)
    }

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }

    return (
        <form className='form container' onSubmit={onSubmit}>
            <div className='form-group inputs'>
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
                    <button disabled={!values.name || !values.email || !values.password}>submit</button>
                </div>
            </div>
        </form>
    )

}