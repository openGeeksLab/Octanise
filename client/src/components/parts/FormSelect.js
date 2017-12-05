import React from 'react'
import { Field } from 'redux-form'

const FormSelect = ({label, name, options}) => (
  <div className="select-wrapper">
      <Field
        label={label}
        name={name}
        component="select">
          <option/>
          {options.map(option => <option key={option} value={option}>{option}</option>)}
      </Field>
  </div>
)

export default FormSelect
