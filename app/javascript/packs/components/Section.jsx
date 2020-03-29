
import React from 'react';
import { Link } from 'react-router';
import FreeScrollBar from 'react-free-scrollbar';
import { AppRegistry, StyleSheet, Text, View } from 'react-native-web';
import SectionColor from './SectionColor'
import { connect } from 'react-redux';
import { updateSection } from '../components/actions';


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
        color:  `${this.props.color}` + '!important',
        textColor: 'black',
        width: '1280px',
      },

      isCardColor: false,
      editSection: false, 
      isCollapse: false,
      color: `${this.props.color}`, 
    };


    this.editSection = this.editSection.bind(this);
    this.toggleEditSection = this.toggleEditSection.bind(this);
    this.toggleCardColor = this.toggleCardColor.bind(this);
    this.getColor = this.getColor.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.update = this.update.bind(this);

    //console.log("section components: ",this.props);

  }

   editSection(e){
     
     e.preventDefault();
     let id = this.props.id;
     if (this.state.editSection === true)
     {
       this.setState({ editSection: !this.state.editSection });
     }

     let title = this.refs.newTitle.value;
     let color = this.state.color;
     let collapse = false;
     let kind = this.props.kind;
     let section = {title: title, color: color, collapse: collapse, kind: kind};
     //console.log("cards sess - " + title + " " +  color + " " + collapse + " " + kind)
     if(title.length !== 0)
     {
       this.update(id, section);
     }
     
  }

  update(id, section)
  {
  	this.props.updateSection(id,section)
  }

  toggleEditSection(){
     this.setState({ editSection: !this.state.editSection }); 
  }

  toggleCardColor(){
    this.setState({ isCardColor: !this.state.isCardColor })
  }

  toggleCollapse(){
    let collapse = !this.props.collapse
    let section = {title: this.props.title, color: this.props.color, collapse: collapse, kind: this.props.kind};
    this.update(this.props.id, section);

  }

  getColor(color) {
  	console.log(color);
    this.setState({ color: color });  
  }

  render(){

  	let style = document.createElement('style');
	  style.type = 'text/css';
	  style.innerHTML = `.grey-${this.props.id} {
	    background-color: ${this.props.color};
	  }`;
	  document.getElementsByTagName('head')[0].appendChild(style);

	  let className = `card grey-${this.props.id}`;
	  let bottomCard = `card-content black-text grey-${this.props.id}`;

    return(
      <div>
        <div className={className} style={this.state.sectionStyle}>
        	<div className="card-action black-text">
        		<span className="card-title">{this.props.title}</span>
        		<a className="right">delete</a>
        		<a className=" right" onClick={this.toggleEditSection}>Edit</a>
        		<a className="right" onClick={this.toggleCollapse}>
              {Boolean(this.props.collapse) ? (<div>expand</div>): (<div>collapse</div>)}
            </a>
            {
            	Boolean(this.state.editSection) ? (
            		<div>
            			<input placeholder={this.props.title} ref="newTitle" required={true} />
            			<div className="input-field col s12 m6">
                    <select className="browser-default icons">
                      <option value={this.props.kind} disabled selected>{this.props.kind}</option>
                    </select>
                  </div>
                  <a className="waves-effect waves-green btn-flat black" onClick={this.toggleCardColor}>Choose Color</a>  
                  {
                  	this.state.isCardColor ? (
                  		<div>
                        <SectionColor getColor={this.getColor}/>
                      </div>
                  	) :(null)
                  }
                  <div className=" right">
                   <a href="#" className="modal-close waves-effect waves-green btn-flat" onClick={this.editSection}>SAVE</a>
                  </div>
            		</div>
            	) : (null)
            }

        	</div>
        	<div>
        	{ 

        		Boolean(this.props.collapse) ? (null):(
        			<div className={bottomCard} style={this.state.fStyle}>
        				<FreeScrollBar>
        					<View>
        					</View>
        				</FreeScrollBar>
        			</div>
        		)	
        	}
        	<div>
        	{
        		this.props.lastSectionIndex === this.props.yourIndex ? (
        			<div className="card-action">
	        			<div className={bottomCard}>
	        				<a className="left" >Previous</a>
	                <a className="right" >Next</a>
	        			</div>
	        		</div>
        	 ) : (null)
        	}
        	</div>
        	</div>
        </div>
      </div>
    )
  }

}

const mapDispatchToProps = (dispatch) => {

	return{
		updateSection: (id, section) => {dispatch(updateSection(id, section))}
	}
  
}
export default connect(null, mapDispatchToProps)(Section);





