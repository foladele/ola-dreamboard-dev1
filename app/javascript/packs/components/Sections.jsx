
import React from 'react';
import { Link } from 'react-router';
import AddSection from './AddSection'
import Section from './Section'
import { connect } from 'react-redux';

class Sections extends React.Component {

  render(){
    let sections = this.props.sections.map(section => {
     return(
        <Section key={`section-${section.id}`} {...section} />
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