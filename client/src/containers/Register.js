import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadUser, registerUser } from '../actions';
import { reduxForm } from 'redux-form'
import { validate } from '../validation/RegisterValidation';
import { RegisterView } from '../components/view';

class Register extends Component {
  handleFormSubmit = user => {
    this.props.registerUser(user);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="loginWrapper">
        <div>Register page</div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <RegisterView />
          <button onClick={handleSubmit(this.handleFormSubmit)}>Submit</button>
        </form>
      </div>
    )
  }
}

export default connect(
  state => ({
    user: state.user.user,
    validate: validate
  }),
  dispatch => bindActionCreators({loadUser, registerUser}, dispatch)
)(reduxForm({
  form: 'registerForm'
})(Register))
