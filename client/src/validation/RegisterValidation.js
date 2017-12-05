export function validate (formProps) {
  let errors = {}
  if (!formProps.email) {
    errors.email = 'Please enter email'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = 'Invalid email address'
  }

  if (formProps.phone && (!/^(?=.*?[1-9])[0-9()-]+$/.test(formProps.phone))) {
    errors.phone = 'Please enter valid phone'
  }

  if (!formProps.password) {
    errors.password = 'Please enter password'
  } else if (formProps.password.length < 6) {
    errors.password = 'Password should be more than 6 characters'
  } else if (formProps.password !== formProps.confirm) {
    errors.confirm = 'Passwords should match'
  }

  if(!formProps.role) {
    errors.role = 'Please choose role'
  }

  return errors
}
