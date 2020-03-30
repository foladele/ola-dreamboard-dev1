import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { loggedIn, logout } from '../components/auth/actions';
import { getSections } from '../components/actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    // console.log("App: ", this.props.sections);
  }

  UNSAFE_componentWillMount() {
    this.props.dispatch(getSections());
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
        <div>
          <Navbar auth={this.props.auth} history={this.props.history} />
          <div>{ this.props.children }</div>
        </div>
          <Footer/>
        <div>
        </div>
      
       
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
