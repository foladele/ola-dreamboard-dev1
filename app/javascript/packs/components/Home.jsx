import React from 'react';
import { Link } from 'react-router';
import '../stylesheets/homepagestyle.scss';

//pry error
const Home = () => (
 <div  className="card-title" 
 style={{
 	backgroundImage: `url("https://res.cloudinary.com/dzv3e4tm4/image/upload/v1585362122/blowballs-close-up-dandelion-132419_b2cqq9.jpg")`,
  minHeight: '250px',
  width: '1280px',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  position: 'relative',
 }}
 >
 	<div>
 		<h1 className="center black-text">Queen's Dream Board</h1>
 	</div>
	 <div>	
	  <div style={{ 
	  	position: 'absolute',
		  bottom: '20px',
		  right: '20px',
		  backgroundColor: 'black',
		  color: 'white',
		  paddingLeft: '20px',
		  paddingRight: '20px'
	  }}>
	    <h6>Keep building this dream Queen! you're almost there!!!</h6>
	  </div>
	 </div>
 </div>
)

export default Home;