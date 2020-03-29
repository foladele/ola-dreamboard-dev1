
import React from 'react';
import { Link } from 'react-router';
import AddSection from './AddSection'
import Section from './Section'
import { connect } from 'react-redux';
import { updateSection, addSection, deleteSection } from '../components/actions';


class Sections extends React.Component {

  constructor(props) {
    super(props);
    this.updateSection = this.updateSection.bind(this);
    this.addSection = this.addSection.bind(this);
  }

  updateSection(id, section)
  {
    this.props.updateSection(id,section, this.props.sections)
    window.location.reload(false);
  }

  addSection(section)
  {
    this.props.addSection(section);
    window.location.reload(false);
  }

  render(){
    // console.log("sections components: ",this.props.sections);

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
        update={this.updateSection}
        />
      )
    })

    return(
      <div>
        <ul>{sections}</ul>
        <AddSection addSection={this.addSection}/>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return{sections: state.sections}
}

const mapDispatchToProps = (dispatch) => {

  return{
    updateSection: (id, section, sections) => {dispatch(updateSection(id, section, sections))},
    addSection: (section) => {dispatch(addSection(section))},
  }
  
}
export default connect(mapStateToProps, mapDispatchToProps)(Sections);