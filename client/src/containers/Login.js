import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadUser, loginUser } from '../actions';
import { reduxForm } from 'redux-form'
import { validate } from '../validation/LoginValidation';
import { LoginView } from '../components/view';

class Login extends Component {
  handleFormSubmit = user => {
    this.props.loginUser(user);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="loginWrapper">
        <div>Login page</div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <LoginView />
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
  dispatch => bindActionCreators({loadUser, loginUser}, dispatch)
)(reduxForm({
  form: 'loginForm'
})(Login))
