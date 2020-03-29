
import React from 'react';
import { Link } from 'react-router';
import AddSection from './AddSection'
import Section from './Section'
import { connect } from 'react-redux';

class Sections extends React.Component {


  render(){

    let lastSectionIndex = 0;
    if(this.props.sections.length != 0)
    {
      lastSectionIndex = this.props.sections.indexOf(this.props.sections.slice(-1)[0]) ;
      //console.log('lastSectionIndex ' + lastSectionIndex);
    }

    let sections = this.props.sections.map(section => {
     return(
        <Section key={`section-${section.id}`} {...section} 
        lastSectionIndex={lastSectionIndex} 
        yourIndex={this.props.sections.indexOf(section)}
        />
      )
    })

    return(
      <div>
        <ul>{sections}</ul>
        <AddSection/>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return{sections: state.sections}
}
export default connect(mapStateToProps)(Sections);