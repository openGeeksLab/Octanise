import React from 'react'
import { Field } from 'redux-form'
import { Input } from '../parts'

const LoginView = () => (
  <div className="view">
    <div className="view form-columns">
      <Field label="Email is Required" component={Input} name="email" type="text" />
      <Field label="Password" component={Input} name="passwd" type="password" />
    </div>
  </div>
)

export default LoginView
