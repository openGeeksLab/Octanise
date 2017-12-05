export function validate (formProps) {
  let errors = {}
  if (!formProps.email) {
    errors.email = 'Please enter email'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = 'Invalid email address'
  }

  if (!formProps.password) {
    errors.password = 'Please enter password'
  } else if (formProps.password.length < 6) {
    errors.password = 'Password should be more than 6 characters'
  } 

  return errors
}
