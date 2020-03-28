
import React from 'react';
import { Link } from 'react-router';

class Section extends React.Component {

	constructor(props) {
    super(props);

    this.state = { 

      bStyle: {
        height: '400px',
        width: '1280px',
        backgroundColor: `${this.props.color}`,
      },
      fStyle: {
        height: '400px',
        width: '1250px',
        backgroundColor: `${this.props.color}`,
      },
      testBC:{
        color:  `${this.props.color}`,
      },
      sectionStyle: {
        color:  `${this.props.color}` + '!important', //'#ffd600',
        textColor: 'black',
        width: '1280px',
      } 
    };

  }

  render(){
    return(
      <div>
        <ul>Section {this.props.title}</ul>
      </div>
    )
      
  	
  }
}

export default Section;