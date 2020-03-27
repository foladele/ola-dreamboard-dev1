import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import { loggedIn, logout } from '../components/auth/actions';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const userId = localStorage.getItem('userId');
    const apiKey = localStorage.getItem('apiKey');
    if (!this.props.auth && apiKey)
      this.props.dispatch(loggedIn(userId, apiKey))
    else
      this.props.dispatch(logout());
  }

  render() {
    return (
      <div>
        <Navbar auth={this.props.auth} history={this.props.history} />
        { this.props.children }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    if(state.auth)
    return {
      auth: state.auth.isAuthenticated
    }
  else
    return state;
}

export default connect(mapStateToProps)(App);
