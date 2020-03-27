import React from 'react';
import { connect } from 'react-redux';
import { handleLogin } from './actions';

class Login extends React.Component {
    constructor(props) {
		super(props);
		const redirectLocation = '/'
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = { error: false, redirectRoute: redirectLocation }
	}

	handleSubmit(e) {
    e.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    this.props.dispatch(handleLogin(email, password, this.state.redirectRoute, this.props.history));
	}

	render() {
		return(
			<div className='container'>
			  <h3>Login</h3>
					<form onSubmit={(e) => this.handleSubmit(e) }>
				    <input type='text' ref='email' required placeholder='Email' />
				    <input type='password' ref='password' required placeholder='Password' />
				    <input type='submit' className='btn' value='Login' />
				  </form>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return { auth: state.auth.api_key }
}

export default connect(mapStateToProps, null)(Login)