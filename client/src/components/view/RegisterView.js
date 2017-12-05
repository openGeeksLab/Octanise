import React from 'react'
import { Field } from 'redux-form'
import { Input } from '../parts'

const LoginView = () => (
  <div className="view registerView">
    <div className="view form-columns">
      <Field label="Email is Required" component={Input} name="email" type="text" />
      <Field label="Password" component={Input} name="passwd" type="password" />
      <Field label="Confirm password" component={Input} name="confirm" type="password" />
      <Field label="Company name" component={Input} name="name" type="text" />
      <Field label="Phone" component={Input} name="phone" type="text" />
      <Field label="Customer" component={Input} name="role" type="radio" value="customer" />
      <Field label="Supplier" component={Input} name="role" type="radio" value="supplier" />
    </div>
  </div>
)

export default LoginView
