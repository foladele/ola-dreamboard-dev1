import React from 'react';
import { Link } from 'react-router';
import { handleLogout } from './auth/actions';
import { connect } from 'react-redux';
// import 'materialize-css/dist/css/materialize.min.css';
import M from  'materialize-css/dist/js/materialize.min.js';
import '../stylesheets/homepagestyle.scss';

class Navbar extends React.Component {
    constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
	}

	componentDidMount() {
	  let sidenav = document.querySelector('#slide-out');
	  M.Sidenav.init(sidenav, {});
	}

	logout(e) {
		e.preventDefault();
		this.props.dispatch(handleLogout(this.props.history));
	}

	authLink() {
		if(this.props.auth)
			return(
				[
				  <li key='auth-link-0'><Link to="/admin">Admin</Link></li>,
				  <li key='auth-link-1'><a href='#' onClick={this.logout}>Logout</a></li>
				]
			)
	  else
	  	return(<li><Link to="/login">Login</Link></li>)
	}

	render() {
		return(
			<header>
				<nav className="grey lighten-5">
					<div className="nav-wrapper col s12 m8 offset-m2 l6 offset-l4 z-depth-2">
						<Link to="/" className="brand-logo right black-text">Logo</Link>
						<a href="#" data-target="slide-out" className="sidenav-trigger show-on-large black-text"><i className="material-icons">menu</i></a>
						<ul className="sidenav black-text" id="slide-out">
              <li><Link to="/">Home</Link></li>
				      <li><Link to="/about">About</Link></li>
				      <li><Link to="/contact">Contact</Link></li>
              {this.authLink()}
            </ul>
					</div>
				</nav>				
			</header>
		)
	}
}

export default connect()(Navbar);