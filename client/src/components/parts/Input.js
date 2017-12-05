import React from 'react'

const Input = ({ input, label, type, checked, meta: { touched, error } }) => (
    <div>
        <label>{label}</label>
        <div>
          <input {...input} className="form-input" type={type}/>
          {touched && error && <span className="error">{error}</span>}
        </div>
    </div>
)

export default Input
