import React from 'react';


const footerStyle = {

 	  height:'60px', // Replace with the height your footer should be
    width: "100%", // Don't change
    backgroundRepeat: "repeat",
    backgroundAttachment: "scroll",
    backgroundPosition:" 0% 0%",
    position: "fixed",
    bottom: '0pt',
    left: '0pt',
    
 }

class Footer extends React.Component {

 render() {

    return (
      <div style={{paddingTop: '50px'}}>
        <div>
	        <footer className="page-footer grey lighten-5" style={footerStyle}>
		        	<div className="footer-copyright">
		            <div className="container black-text">
		            © 2020 Copyright
		            </div>
	          	</div>
	        </footer>
        </div>
      </div>
    )
  }

}

export default Footer;