
import React from 'react';
import { Link } from 'react-router';
import AddItems from './AddItems'
import Section from './Section'
import { connect } from 'react-redux';
import { updateSection, addSection, deleteSection } from '../components/actions';


class Sections extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sections: [],
    }
    this.updateSection = this.updateSection.bind(this);
    this.addSection = this.addSection.bind(this);
    this.deleteSection = this.deleteSection.bind(this);
  }

  componentWillMount() {
    $.ajax({
      url: '/api/section',
      type: 'GET',
      dataType: 'JSON',
      success: function (data) { 
        // console.log(data);
      }
    }).done( sections => { 
        this.setState({ sections });
        // this.state.sectionCount = sections.length;
        // this.state.lastSectionIndex = sections.indexOf(sections.slice(-1)[0])
        
    })
  }

  updateSection(id, section)
  {
    $.ajax({
      url: `/api/section/${id}`,
      type: 'PUT',
      data: { section: section },
      dataType: 'JSON'
    }).done( section => {
      let sections = this.state.sections;
      let editSection = sections.find( i => i.id === section.id );
      editSection.title = section.title;
      editSection.color = section.color;
      editSection.collapse = section.collapse;
      this.setState({ sections: sections });
    }).fail( msg => {
       alert(msg.errors);
    });

    //this.props.updateSection(id,section, this.state.sections)
    // window.location.reload(false);
  }

  addSection(section)
  {
    $.ajax({
      url: '/api/section',
      type: 'POST',
      data: { section: section},
      dataType: 'JSON',
    }).done( section => {      
      this.setState({ sections: [...this.state.sections, {...section}]});
    }).fail( msg => {
       alert(msg.errors);
    });

    //this.props.addSection(section);
    //window.location.reload(false);
  }

  deleteSection(id)
  {

    $.ajax({
      url: `/api/section/${id}`,
      type: 'DELETE'
    }).done( section  => {
      let sections = this.state.sections;
      let index = sections.findIndex( b => b.id === section.id );
      this.setState({ 
        sections: [
          ...sections.slice(0, index),
          ...sections.slice(index + 1, sections.length)
        ] 
      });
    }).fail( msg => {
      alert(msg.errors);
    });

    window.location.reload(false);
    //this.props.deleteSection(id);
  }

  render(){
    //this.setState({ sections: this.props.sections });
    //console.log("sections props: ",this.props.sections);
    // console.log("sections state: ",this.state.sections);
    

    let lastSectionIndex = 0;
    if(this.state.sections.length != 0)
    {
      lastSectionIndex = this.state.sections.indexOf(this.state.sections.slice(-1)[0]) ;
      //console.log('lastSectionIndex ' + lastSectionIndex);
    }

    let sections = this.state.sections.map(section => {
     return(
        <Section key={`section-${section.id}`} {...section}
        firstSectionIndex={0} 
        lastSectionIndex={lastSectionIndex} 
        yourIndex={this.state.sections.indexOf(section)}
        update={this.updateSection}
        sectionLength={this.state.sections.length}
        deleteSection={this.deleteSection}
        />
      )
    })

    return(
      <div className=" ">
        <ul>{sections}</ul>
        <AddItems addSection={this.addSection}/>
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   return{sections: state.sections}
// }

const mapDispatchToProps = (dispatch) => {

  return{
    updateSection: (id, section, sections) => {dispatch(updateSection(id, section, sections))},
    addSection: (section) => {dispatch(addSection(section))},
    deleteSection: (id) => {dispatch(deleteSection(id))},
  }
  
}

export default connect(null, mapDispatchToProps)(Sections);



