import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadUser } from '../actions';

class Main extends Component {
  render() {
    return (
      <div>Main page</div>
    )
  }
}

export default connect(
  state => ({
    user: state.user
  }),
  dispatch => bindActionCreators({loadUser}, dispatch)
)(Main);
